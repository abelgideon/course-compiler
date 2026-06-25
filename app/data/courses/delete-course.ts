import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function deleteCourse(courseId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const deletedCourse = await db
    .delete(courses)
    .where(and(eq(courses.id, courseId), eq(courses.userId, session.user.id)))
    .returning({ id: courses.id });

  if (deletedCourse.length === 0) {
    return {
      success: false,
      message: "Course not found",
    };
  }

  return {
    success: true,
    message: "Course deleted successfully",
  };
}
