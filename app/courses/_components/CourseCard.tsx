import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Folder } from "lucide-react";
import Link from "next/link";
import { CourseProgress } from "./CourseProgress";
import { OptionsDropdown } from "./OptionsDropdown";

export type CourseCardData = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  createdAt: Date;
  playlist: {
    id: string;
    playlistTitle: string | null;
    thumbnailUrl: string | null;
    videoCount: number | null;
  };
  completedVideos: number;
};

export function CourseCard({ course }: { course: CourseCardData }) {
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
          <OptionsDropdown courseId={course.id} />
        </div>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-col gap-y-7 items-stretch">
        <CourseProgress
          completedVideos={course.completedVideos}
          videoCount={course.playlist.videoCount ?? 0}
        />

        <div className="flex items-center gap-x-2">
          <Folder className="size-7 rounded-md bg-primary/10 p-1 text-primary" />
          <p className="text-sm text-muted-foreground">{course.category}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
