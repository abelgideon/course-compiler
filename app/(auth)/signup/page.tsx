import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm mt-36">
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
        <Button variant="outline" className="w-full">
          <FcGoogle className="mr-2" />
          Sign up with Google
        </Button>
      </CardContent>
    </Card>
  );
}
