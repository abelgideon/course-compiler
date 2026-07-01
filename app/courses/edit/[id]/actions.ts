"use server";

import { revalidatePath } from "next/cache";

import { editCourse } from "@/app/data/courses/edit-course";
import { editCourseSchema } from "@/lib/types";

type EditCourseActionState = {
  success: boolean;
  message: string;
};

export async function editCourseAction(
  courseId: string,
  values: unknown,
): Promise<EditCourseActionState> {
  const parsed = editCourseSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  const result = await editCourse(courseId, parsed.data);

  if (result.success) {
    revalidatePath("/courses");
    revalidatePath(`/courses/${courseId}`);
  }

  return result;
}
