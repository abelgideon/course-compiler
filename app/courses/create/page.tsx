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

import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseSchema, CreateCourseSchema } from "@/lib/types";

export default function CourseCreatePage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
  });

  const onSubmit = async (data: CreateCourseSchema) => {
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
        href="/courses"
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
              <Input
                {...register("playlistUrl")}
                placeholder="https://www.youtube.com/playlist?list=..."
              />
              <FieldError errors={[errors.playlistUrl]} />
            </Field>

            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                {...register("title")}
                placeholder="Deep Learning Fundamentals"
              />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...register("description")}
                placeholder="Learn neural networks, backpropagation, and modern deep learning concepts from scratch."
              />
              <FieldError errors={[errors.description]} />
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <Input {...register("category")} placeholder="Machine Learning" />
              <FieldError errors={[errors.category]} />
            </Field>
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
