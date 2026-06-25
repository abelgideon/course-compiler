import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@/db/schema";
import { CourseWithDuration } from "@/lib/types";
import { Folder, School, Tags, TimerIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { CourseProgress } from "./CourseProgress";
import { getCourse } from "@/app/data/courses/get-course";
import { notFound } from "next/navigation";
import { DeleteCourseButton } from "./DeleteCourseButton";

export async function CourseCard({ course }: { course: Course }) {
  const result = await getCourse(course.id);
  if (!result.success) {
    notFound();
  }

  const fetchedCourse = result.course;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between gap-x-2 items-start">
          <CardTitle className="line-clamp-3">
            <Link
              className="hover:underline hover:text-primary"
              href={`/courses/${course.id}`}
            >
              {course.title}
            </Link>
          </CardTitle>
          <DeleteCourseButton courseId={course.id} />
        </div>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-col gap-y-7 items-stretch">
        <CourseProgress videos={fetchedCourse?.playlist.videos ?? []} />

        <div className="flex items-center gap-x-2">
          <Folder className="size-7 rounded-md bg-primary/10 p-1 text-primary" />
          <p className="text-sm text-muted-foreground">{course.category}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
