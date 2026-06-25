import { Progress } from "@/components/ui/progress";

type Videos = {
  id: string;
  title: string;
  completed: boolean;
}[];

export function CourseProgress({ videos }: { videos: Videos }) {
  const completedVideos = videos.filter((video) => video.completed).length;

  const progressPercentage =
    videos.length === 0 ? 0 : (completedVideos / videos.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Course Progress</span>

        <span className="text-muted-foreground">
          {completedVideos}/{videos.length} completed
        </span>
      </div>

      <Progress value={progressPercentage} />
    </div>
  );
}
