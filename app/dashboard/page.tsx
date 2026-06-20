import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseCard } from "./_components/CourseCard";

export default async function DashboardPage() {
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

        <Link className={buttonVariants()} href={"/dashboard/create"}>
          <PlusIcon />
          Add New Course
        </Link>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
