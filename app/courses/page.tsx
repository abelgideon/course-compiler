import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { CircleSlash, PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseCard } from "./_components/CourseCard";
import { getCourses } from "@/lib/courses/get-courses";

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { courses } = await getCourses();

  return (
    <div className="p-3">
      <div className="flex justify-between mt-8 align-middle">
        <h1 className="text-3xl md:text-4xl font-bold">Courses</h1>

        <Link className={buttonVariants()} href={"/courses/create"}>
          <PlusIcon />
          Add New Course
        </Link>
      </div>

      {!courses || courses.length === 0 ? (
        <div className="max-w-100 mt-10 md:mt-30 bg-primary/10 mx-auto p-10 flex flex-col gap-y-5 justify-center items-center rounded-md">
          <CircleSlash className="size-15 p-2 rounded-[50%] text-primary bg-primary/10" />
          <p className="text-center">
            You have no courses available. Try adding a new course!
          </p>
          <Link className={buttonVariants()} href={"/courses/create"}>
            <PlusIcon />
            Add New Course
          </Link>
        </div>
      ) : (
        <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {courses &&
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      )}
    </div>
  );
}
