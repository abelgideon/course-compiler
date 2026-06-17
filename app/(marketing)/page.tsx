"use client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ArrowRight, DotIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <main className="text-center mt-30 md:mt-50">
      <Badge className="text-[8px] md:text-[10px]">
        Playlists in <DotIcon /> Courses out <DotIcon /> Progress that sticks
      </Badge>
      <h1 className="mt-9 text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.9] text-foreground">
        LEARN FROM YOUTUBE
      </h1>
      <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.9] text-muted-foreground">
        DISTRACTION FREE
      </h1>
      <p className="mt-3 text-[15px] md:text-lg text-muted-foreground max-w-70 md:max-w-md mx-auto">
        Store your courses and track your progress all in one place.
      </p>
      {session ? (
        <Link className={cn(buttonVariants(), "mt-7")} href={"/dashboard"}>
          Go to Dashboard <ArrowRight />
        </Link>
      ) : (
        <Link className={cn(buttonVariants(), "mt-7")} href={"/signup"}>
          Get Started Now <ArrowRight />
        </Link>
      )}
    </main>
  );
}
