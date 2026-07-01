"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader, PlusIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { useForm, type FieldValues } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { EditCourseSchema, editCourseSchema } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editCourseAction } from "../actions";

type CourseType = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export function CourseEditForm({ course }: { course: CourseType }) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditCourseSchema>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      title: course.title,
      description: course.description ?? "",
      category: course.category ?? "",
    },
  });

  const onSubmit = async (data: EditCourseSchema) => {
    try {
      const result = await editCourseAction(course.id, data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/courses");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
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
          <CardTitle>Edit course</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  <SaveIcon className="mr-2" /> Save changes
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
