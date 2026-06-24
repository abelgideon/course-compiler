"use server";

import { db } from "@/db/drizzle";
import { courses, playlists, userVideoProgress, videos } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function markVideoComplete(videoId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  // Verify the video belongs to one of the user's courses
  const video = await db
    .select({
      videoId: videos.id,
      courseId: courses.id,
    })
    .from(videos)
    .innerJoin(playlists, eq(videos.playlistId, playlists.id))
    .innerJoin(courses, eq(playlists.id, courses.playlistId))
    .where(and(eq(videos.id, videoId), eq(courses.userId, session.user.id)))
    .limit(1);

  if (video.length === 0) {
    return {
      success: false,
      message: "Video not found",
    };
  }

  const { courseId } = video[0];

  await db
    .insert(userVideoProgress)
    .values({
      userId: session.user.id,
      videoId,
      completed: true,
      completedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [userVideoProgress.userId, userVideoProgress.videoId],
      set: {
        completed: true,
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    });

  revalidatePath(`/courses/${courseId}`);

  return {
    success: true,
  };
}
