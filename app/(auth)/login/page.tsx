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

export default function LoginPage() {
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
        <Button variant="outline" className="w-full">
          <FcGoogle className="mr-2" />
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
}
