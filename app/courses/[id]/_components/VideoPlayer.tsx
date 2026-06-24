import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

const course = {
  title: "Learn HTML & CSS by Building Projects",
  lastSynced: "2 hours ago",
};

const currentVideo = {
  id: "3",
  title: "Understanding CSS Selectors",
  description:
    "Learn how CSS selectors work, including element, class, ID, attribute, and pseudo-class selectors. By the end of this lesson you'll be able to target HTML elements precisely and write cleaner stylesheets.",
  duration: "9:15",
  youtubeId: "dQw4w9WgXcQ",
};

export default function VideoPlayer() {
  return (
    <div className="p-3">
      <div className="flex flex-col md:flex-row items-center md:justify-between border-b pb-2">
        <div>
          <h1 className="text-xl font-semibold">{course.title}</h1>
          <p className="text-xs text-muted-foreground">
            Synced {course.lastSynced}
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
          src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">{currentVideo.title}</h2>
          <span className="text-sm text-muted-foreground">
            ({currentVideo.duration})
          </span>
        </div>

        <p className="mt-2 text-muted-foreground">{currentVideo.description}</p>
      </div>
    </div>
  );
}
