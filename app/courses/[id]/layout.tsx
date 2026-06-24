import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function SingleCoursePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-8">
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
      {children}
    </div>
  );
}
