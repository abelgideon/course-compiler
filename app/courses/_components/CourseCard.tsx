import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";

export function CourseCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </div>
        <Trash2Icon className="text-red-600 size-5" />
      </CardHeader>
      <CardFooter>Categories and Hours</CardFooter>
    </Card>
  );
}
