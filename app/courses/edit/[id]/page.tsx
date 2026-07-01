import { getCourse } from "@/app/data/courses/get-course";
import { CourseEditForm } from "./_components/CourseEditForm";
import { notFound } from "next/navigation";

export default async function CourseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCourse(id);

  if (!result.success || !result.course) {
    notFound();
  }

  const courseStripped = {
    id: result.course.id,
    title: result.course.title,
    description: result.course.description ?? "",
    category: result.course.category ?? "",
  };

  return <CourseEditForm course={courseStripped} />;
}
