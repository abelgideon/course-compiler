"use server";

import { db } from "@/db/drizzle";
import { courses, playlists, videos } from "@/db/schema";
import { createCourseSchema } from "@/lib/types";
import { extractPlaylistId } from "@/app/data/youtube/extract-playlist-id";
import { getPlaylist } from "@/app/data/youtube/get-playlist";
import { getPlaylistVideos } from "@/app/data/youtube/get-playlist-videos";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createCourse(data: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const userId = session.user.id;
  const parsed = createCourseSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
    };
  }

  const playlistId = extractPlaylistId(parsed.data.playlistUrl);

  if (!playlistId) {
    return {
      success: false,
      message: "Please enter a valid playlist url",
    };
  }

  let playlist = await db.query.playlists.findFirst({
    where: eq(playlists.youtubePlaylistId, playlistId),
  });

  if (!playlist) {
    const playlistData = await getPlaylist(playlistId);
    const videosData = await getPlaylistVideos(playlistId);

    const inserted = await db
      .insert(playlists)
      .values({
        youtubePlaylistId: playlistData.id,
        url: `https://www.youtube.com/playlist?list=${playlistData.id}`,
        playlistTitle: playlistData.title,
        thumbnailUrl: playlistData.thumbnail,
        videoCount: playlistData.videoCount,
        channelTitle: playlistData.channelTitle,
        lastSyncedAt: new Date(),
      })
      .returning();

    playlist = inserted[0];

    if (!playlist) {
      return {
        success: false,
        message: "Failed to create course",
      };
    }

    const createdPlaylist = playlist;

    await db.insert(videos).values(
      videosData.map((video) => ({
        youtubeVideoId: video.youtubeVideoId,
        playlistId: createdPlaylist.id,
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail,
        position: video.position,
        channelTitle: video.channelTitle,
        publishedAt: video.publishedAt,
      })),
    );
  }

  const [course] = await db
    .insert(courses)
    .values({
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      userId,
      playlistId: playlist.id,
    })
    .returning();

  if (!course) {
    return {
      success: false,
      message: "Failed to create course",
    };
  }

  return {
    success: true,
    courseId: course.id,
  };
}
