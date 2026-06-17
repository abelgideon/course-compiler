"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginForm() {
  const [googlePending, startGoogleTransition] = useTransition();

  async function logInWithGoogle() {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }
  return (
    <Card className="w-full max-w-sm mt-36  mx-4 md:mx-0">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Continue with Google to log in to your account
        </CardDescription>
        <CardAction>
          <Link
            href={"/signup"}
            className={buttonVariants({ variant: "link" })}
          >
            Sign up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Button
          onClick={logInWithGoogle}
          variant="outline"
          className="w-full"
          disabled={googlePending}
        >
          {googlePending ? (
            <>
              <Loader className="animate-spin size-4" />
              Loading...
            </>
          ) : (
            <>
              <FcGoogle className="mr-2" />
              Log in with Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
