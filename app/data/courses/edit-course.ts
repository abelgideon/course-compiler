import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

type EditCourseData = {
  title: string;
  description?: string;
  category?: string;
};

export async function editCourse(courseId: string, data: EditCourseData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const updatedCourse = await db
    .update(courses)
    .set({
      title: data.title,
      description: data.description ?? null,
      category: data.category ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(courses.id, courseId), eq(courses.userId, session.user.id)))
    .returning({ id: courses.id });

  if (updatedCourse.length === 0) {
    return {
      success: false,
      message: "Course not found",
    };
  }

  return {
    success: true,
    message: "Course updated successfully",
  };
}
