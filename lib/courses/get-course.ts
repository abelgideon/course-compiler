import { db } from "@/db/drizzle";
import { courses, userVideoProgress } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getCourse(courseId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const course = await db.query.courses.findFirst({
    where: and(eq(courses.id, courseId), eq(courses.userId, session.user.id)),
    with: {
      playlist: {
        with: {
          videos: {
            orderBy: (videos, { desc }) => [desc(videos.position)],
            with: {
              progress: {
                where: eq(userVideoProgress.userId, session.user.id),
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return {
      success: false,
      message: "Course not found",
    };
  }

  const courseWithProgress = {
    ...course,
    playlist: {
      ...course.playlist,
      videos: course.playlist.videos.map((video) => ({
        ...video,
        completed: video.progress[0]?.completed ?? false,
      })),
    },
  };

  return {
    success: true,
    course: courseWithProgress,
  };
}
