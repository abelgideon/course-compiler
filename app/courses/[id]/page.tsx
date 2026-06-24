import VideoList from "./_components/VideoList";
import VideoPlayer from "./_components/VideoPlayer";

export default async function SingleCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mt-5 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      <VideoPlayer />
      <VideoList />
    </div>
  );
}
