import { Course } from "@/db/schema";
import { z } from "zod";

export const createCourseSchema = z.object({
  playlistUrl: z
    .url("Please enter a valid url")
    .trim()
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          const isYouTube =
            parsed.hostname === "youtube.com" ||
            parsed.hostname === "www.youtube.com";

          const hasPlaylistId = parsed.searchParams.has("list");

          return isYouTube && hasPlaylistId;
        } catch {
          return false;
        }
      },
      { error: "Please enter a valid YouTube playlist URL" },
    ),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title can not be more than 50 characters"),
  description: z
    .string()
    .trim()
    .max(100, "Description can not be more than 100 characters")
    .optional(),
  category: z
    .string()
    .max(50, "Category can not be more than 50 characters")
    .optional(),
});

export type CourseWithDuration = Course & {
  totalDuration: number;
};

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
