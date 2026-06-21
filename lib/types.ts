import { z } from "zod";

export const courseSchema = z.object({
  playlistUrl: z.url("Please enter a valid url").refine((url) => {
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
  }),
  title: z
    .string()
    .max(50, "Title can not be more than 50 characters")
    .min(1, "Title is required"),
  description: z
    .string()
    .max(100, "Description can not be more than 100 characters"),
  category: z.string().max(50, "Category can not be more than 50 characters"),
});

export type TCourseSchema = z.infer<typeof courseSchema>;
