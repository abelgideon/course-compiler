"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { useSession } from "@/lib/auth-client";
import DropdownMenuAvatar from "./user-dropdown";

export default function Navbar() {
  const session = useSession();
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="flex flex-col gap-3 md:flex-row md:gap-0 items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        <div className="flex items-center space-x-3">
          {session.data ? (
            <>
              <DropdownMenuAvatar />
              <ModeToggle />
            </>
          ) : (
            <>
              <ModeToggle />
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
        </div>
      </nav>
    </header>
  );
}
