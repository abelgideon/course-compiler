"use server";

import { deleteCourse } from "@/app/data/courses/delete-course";
import { revalidatePath } from "next/cache";

export async function deleteCourseAction(courseId: string) {
  const result = await deleteCourse(courseId);

  if (!result.success) {
    throw new Error(result.message);
  }

  revalidatePath("/courses");

  return result;
}
