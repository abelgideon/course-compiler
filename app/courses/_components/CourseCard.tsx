import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@/db/schema";
import { CourseWithDuration } from "@/lib/types";
import { School, TimerIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-x-2">
          <CardTitle className="line-clamp-3">
            <Link
              className="hover:underline hover:text-primary"
              href={`/courses/${course.id}`}
            >
              {course.title}
            </Link>
          </CardTitle>
          <Trash2Icon className="text-red-600 size-5 shrink-0" />
        </div>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="mt-4 flex items-center gap-x-5">
          {/* <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">4h</p>
          </div> */}
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
