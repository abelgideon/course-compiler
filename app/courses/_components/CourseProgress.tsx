import { Progress } from "@/components/ui/progress";

export function CourseProgress({
  completedVideos,
  videoCount,
}: {
  completedVideos: number;
  videoCount: number;
}) {
  const progressPercentage =
    videoCount === 0 ? 0 : (completedVideos / videoCount) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Course Progress</span>

        <span className="text-muted-foreground">
          {completedVideos}/{videoCount} completed
        </span>
      </div>

      <Progress value={progressPercentage} />
    </div>
  );
}
