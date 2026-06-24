import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, PlayIcon } from "lucide-react";

type VideoListProps = {
  courseId: string;
  currentVideoId: string;
  videos: {
    id: string;
    title: string;
    completed: boolean;
  }[];
};

export default function VideoList({
  courseId,
  currentVideoId,
  videos,
}: VideoListProps) {
  const completedVideos = videos.filter((video) => video.completed).length;

  const progressPercentage =
    videos.length === 0 ? 0 : (completedVideos / videos.length) * 100;

  return (
    <div className="p-3 md:p-0 flex flex-col gap-y-3 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Course Progress</span>

          <span className="text-muted-foreground">
            {completedVideos}/{videos.length} completed
          </span>
        </div>

        <Progress value={progressPercentage} />
      </div>

      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/courses/${courseId}?video=${video.id}`}
          className={cn(
            buttonVariants({
              variant: video.id === currentVideoId ? "default" : "secondary",
            }),
            video.completed && "bg-green-800 text-white",
            "flex w-full justify-start gap-x-4 p-7",
          )}
        >
          {video.completed ? (
            <CheckCircle className="shrink-0" />
          ) : (
            <PlayIcon className="shrink-0" />
          )}

          <div className="min-w-0 flex-1 text-left">
            <span className="block line-clamp-2">{video.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
