import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayCircleIcon, PlayIcon } from "lucide-react";

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

export default function VideoList() {
  return (
    <div className="md:mt-16 p-3 flex flex-col gap-y-3">
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
