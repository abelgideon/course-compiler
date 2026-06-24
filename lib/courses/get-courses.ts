import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getCourses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const coursesData = await db.query.courses.findMany({
    where: eq(courses.userId, session.user.id),
  });

  return {
    success: true,
    courses: coursesData,
  };
}
