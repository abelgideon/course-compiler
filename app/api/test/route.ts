import { db } from "@/db/drizzle";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("ERROR", error);
    console.error("CAUSE", error?.cause);
    console.error("SOURCE ERROR", error?.cause?.sourceError);
    console.error("INNER CAUSE", error?.cause?.sourceError?.cause);

    return Response.json(
      {
        message: String(error),
        cause: String(error?.cause),
        sourceError: String(error?.cause?.sourceError),
        innerCause: String(error?.cause?.sourceError?.cause),
      },
      { status: 500 },
    );
  }
}
