import { notFound } from "next/navigation";

import { getCourse } from "@/lib/courses/get-course";

import VideoList from "./_components/VideoList";
import VideoPlayer from "./_components/VideoPlayer";

export default async function SingleCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video?: string }>;
}) {
  const { id } = await params;
  const { video } = await searchParams;

  const result = await getCourse(id);

  if (!result.success) {
    notFound();
  }

  const course = result.course;

  if (!course || course.playlist.videos.length === 0) {
    notFound();
  }

  const currentVideo =
    course.playlist.videos.find((v) => v.id === video) ??
    course.playlist.videos[0];

  return (
    <div className="mt-5 gap-4 md:gap-9 md:mt-9 grid grid-cols-1 md:grid-cols-[3fr_1fr]">
      <VideoPlayer course={course} video={currentVideo} />

      <VideoList
        courseId={course.id}
        currentVideoId={currentVideo.id}
        videos={course.playlist.videos}
      />
    </div>
  );
}
