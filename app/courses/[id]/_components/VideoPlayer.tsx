import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, RefreshCcw } from "lucide-react";
import { markVideoComplete } from "../actions";

type VideoPlayerProps = {
  course: {
    title: string;
    playlist: {
      lastSyncedAt: Date | null;
    };
  };
  video: {
    id: string;
    title: string;
    description: string | null;
    youtubeVideoId: string;
    completed: boolean;
  };
};

export default function VideoPlayer({ course, video }: VideoPlayerProps) {
  return (
    <div className="p-3 md:p-0">
      <div className="flex flex-col md:flex-row items-center md:justify-between border-b pb-2 gap-3">
        <div>
          <h1 className="text-xl font-semibold">{course.title}</h1>

          <p className="text-xs text-muted-foreground">
            {course.playlist.lastSyncedAt
              ? `Synced ${course.playlist.lastSyncedAt.toLocaleString()}`
              : "Never synced"}
          </p>
        </div>

        <button
          className={cn(
            buttonVariants(),
            "shrink-0 mt-5 md:mt-0 w-full md:w-fit",
          )}
        >
          <RefreshCcw />
          Resync Playlist
        </button>
      </div>

      <div className="mt-4 aspect-video overflow-hidden rounded-lg border">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium">{video.title}</h2>
        <form
          action={async () => {
            "use server";
            await markVideoComplete(video.id);
          }}
          className="mt-4 mb-4"
        >
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              video.completed && "bg-green-800 text-white",
            )}
          >
            <CheckCircle />
            {video.completed ? "Completed" : "Mark as complete"}
          </button>
        </form>
        {video.description && (
          <p className=" text-muted-foreground">{video.description}</p>
        )}
      </div>
    </div>
  );
}
