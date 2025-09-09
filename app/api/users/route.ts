import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { usersTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, age, email } = await req.json();

    if (!name || !age || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(usersTable)
      .values({ name, age: Number(age), email })
      .run();

    // Convert BigInt to number for JSON
    return NextResponse.json({ id: Number(result.lastInsertRowid) });
  } catch (err: any) {
    console.error("Failed to insert user:", err);

    // Handle duplicate email
    if (err?.cause?.code === "SQLITE_CONSTRAINT") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to insert user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await db.select().from(usersTable).all();
    return NextResponse.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
