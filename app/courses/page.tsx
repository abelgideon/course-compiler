import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseCard } from "./_components/CourseCard";
import { CourseWithDuration } from "@/lib/types";

const sampleCourses: CourseWithDuration[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Deep Learning Fundamentals",
    description:
      "Learn deep learning from scratch with PyTorch and TensorFlow.",
    category: "Machine Learning",
    totalDuration: 14,
    userId: "user_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    playlistId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    title: "Full Stack Web Development",
    description: "Build modern web apps with Next.js, Tailwind, and Postgres.",
    category: "Web Development",
    totalDuration: 22,
    userId: "user_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    playlistId: "d4e5f6a7-b8c9-0123-defa-234567890123",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    title: "Data Structures & Algorithms",
    description: "Master DSA for technical interviews.",
    category: "Computer Science",
    totalDuration: 18,
    userId: "user_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    playlistId: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
];

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="p-3">
      <div className="flex justify-between mt-8 align-middle">
        <h1 className="text-3xl md:text-4xl font-bold">Courses</h1>

        <Link className={buttonVariants()} href={"/courses/create"}>
          <PlusIcon />
          Add New Course
        </Link>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {sampleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
