import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayCircleIcon, PlayIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const videos = [
  {
    id: "1",
    title: "Introduction to HTML",
    duration: "5:32",
    completed: true,
  },
  {
    id: "2",
    title: "Building Your First Web Page",
    duration: "12:48",
    completed: true,
  },
  {
    id: "3",
    title: "Understanding CSS Selectors",
    duration: "9:15",
    completed: false,
  },
  {
    id: "4",
    title: "Flexbox Crash Course",
    duration: "18:24",
    completed: false,
  },
  {
    id: "5",
    title: "Responsive Design Basics",
    duration: "14:07",
    completed: false,
  },
];

const courseProgress = {
  completed: 2,
  total: 5,
};

const progressPercentage =
  (courseProgress.completed / courseProgress.total) * 100;

export default function VideoList() {
  return (
    <div className="p-3 flex flex-col gap-y-3">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Course Progress</span>
          <span className="text-muted-foreground">
            {courseProgress.completed}/{courseProgress.total} completed
          </span>
        </div>

        <Progress value={progressPercentage} />
      </div>
      {videos.map((video) => (
        <button
          key={video.id}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "flex justify-start gap-x-4 p-7",
          )}
        >
          <PlayIcon className="shrink-0" />
          <div className="flex flex-col items-start text-left">
            <span>{video.title}</span>
            <span className="text-xs text-muted-foreground">
              {video.duration}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
