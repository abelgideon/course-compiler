import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "self-start")}
        href="/"
      >
        <ArrowLeft />
        Back
      </Link>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
