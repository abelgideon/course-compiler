"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { useSession } from "@/lib/auth-client";
import DropdownMenuAvatar from "./user-dropdown";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data, isPending } = useSession();
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="m-3 md:m-0 text-2xl font-bold flex justify-center items-center"
        >
          <p>
            <span className="dark:text-white text-[20px]">course</span>
            <span className="text-amber-700 text-[20px]">compiler</span>
          </p>
        </Link>
        <div className="flex items-center space-x-3">
          {isPending ? (
            <Skeleton className="h-10 mr-3 w-40" />
          ) : data ? (
            <>
              <DropdownMenuAvatar />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Log in
              </Link>
              <Link href="/signup" className={buttonVariants()}>
                Sign up
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
