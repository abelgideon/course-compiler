"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const courseSchema = z.object({
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

export default function CourseCreatePage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    reset();
  };

  return (
    <div className="mt-8 p-3">
      <Link
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "hidden md:inline-flex md:self-start",
        )}
        href="/dashboard"
      >
        <ArrowLeft />
        Back
      </Link>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Add a new course</CardTitle>
          <CardDescription>
            Enter the details for your new course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Field>
              <FieldLabel>Playlist URL</FieldLabel>
              <Input {...register("playlistUrl")} placeholder="Playlist link" />
              <FieldError errors={[errors.playlistUrl]} />
            </Field>

            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input {...register("title")} placeholder="Course title" />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...register("description")}
                placeholder="Course description"
              />
              <FieldError errors={[errors.description]} />
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <Input {...register("category")} placeholder="Course category" />
              <FieldError errors={[errors.category]} />
            </Field>
            {/* <input
              {...register("playlistUrl")}
              type="url"
              name="playlistUrl"
              id="playlistUrl"
              placeholder="Playlist URL"
            />
            <input
              {...register("title")}
              type="text"
              name="title"
              id="title"
              placeholder="title"
            />
            <textarea
              {...register("description")}
              name="description"
              id="description"
              placeholder="Title"
            />
            <input
              {...register("category")}
              type="text"
              id="category"
              name="category"
              className="border-2 block"
              placeholder="Category"
            /> */}

            <button
              disabled={isSubmitting}
              className={cn(buttonVariants(), "w-full md:w-fit")}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" /> Loading...
                </>
              ) : (
                <>
                  <PlusIcon /> Add new course
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
