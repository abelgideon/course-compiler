"use client";

import React from "react";
import {
  ChevronDown,
  GitGraphIcon,
  LayoutDashboardIcon,
  Loader,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export default function DropdownMenuAvatar() {
  const [open, setOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const router = useRouter();
  const session = useSession();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError: () => {
          toast.error("Internal server error");
          setIsSigningOut(false);
        },
      },
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 px-2">
          <Avatar className="size-6 rounded-lg">
            <AvatarImage
              src={session.data?.user.image ?? undefined}
              alt={session.data?.user.name ?? "Profile picture"}
            />
            <AvatarFallback className="rounded-lg">
              {session.data?.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="truncate">{session.data?.user.name}</div>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                src={session.data?.user.image ?? undefined}
                alt={session.data?.user.name ?? "Profile picture"}
              />
              <AvatarFallback className="rounded-lg">
                {session.data?.user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session.data?.user.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {session.data?.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard"}>
            <DropdownMenuItem>
              <LayoutDashboardIcon />
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/stats"}>
            <DropdownMenuItem>
              <GitGraphIcon />
              Stats
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500!"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <>
              <Loader className="animate-spin size-4" />
              Logging out...
            </>
          ) : (
            <>
              <LogOutIcon className="text-red-500!" />
              Log out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
