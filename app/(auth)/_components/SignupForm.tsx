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
import Link from "next/link";
import { useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function SignupForm() {
  const [googlePending, startGoogleTransition] = useTransition();

  async function signUpWithGoogle() {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed up with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }
  return (
    <Card className="w-full max-w-sm mt-36 mx-4 md:mx-0">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Continue with Google to create your account
        </CardDescription>
        <CardAction>
          <Link href={"/login"} className={buttonVariants({ variant: "link" })}>
            Log in
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Button
          onClick={signUpWithGoogle}
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
              Sign up with Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
