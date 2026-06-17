import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, DotIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="text-center mt-50">
      <Badge>
        Playlists in <DotIcon /> Courses out <DotIcon /> Progress that sticks
      </Badge>
      <h1 className="mt-9 text-6xl font-extrabold uppercase tracking-tight leading-[0.9] text-foreground">
        LEARN FROM YOUTUBE
      </h1>
      <h1 className="text-6xl font-extrabold uppercase tracking-tight leading-[0.9] text-muted-foreground">
        DISTRACTION FREE
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
        Store your courses and track your progress all in one place.
      </p>
      <Link className={cn(buttonVariants(), "mt-7")} href={"/signup"}>
        Get Started Now <ArrowRight />
      </Link>
    </main>
  );
}
