import { db } from "@/db/drizzle";
import { courses, playlists, videos, userVideoProgress } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, count, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getCourses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const coursesData = await db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      category: courses.category,
      createdAt: courses.createdAt,

      playlist: {
        id: playlists.id,
        playlistTitle: playlists.playlistTitle,
        thumbnailUrl: playlists.thumbnailUrl,
        videoCount: playlists.videoCount,
      },

      completedVideos: count(userVideoProgress.videoId),
    })
    .from(courses)
    .innerJoin(playlists, eq(courses.playlistId, playlists.id))
    .leftJoin(videos, eq(videos.playlistId, playlists.id))
    .leftJoin(
      userVideoProgress,
      and(
        eq(userVideoProgress.videoId, videos.id),
        eq(userVideoProgress.userId, session.user.id),
        eq(userVideoProgress.completed, true),
      ),
    )
    .where(eq(courses.userId, session.user.id))
    .groupBy(courses.id, playlists.id);

  return {
    success: true,
    courses: coursesData,
  };
}
