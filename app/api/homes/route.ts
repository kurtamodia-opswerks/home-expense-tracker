// app/api/homes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createHome, assignUserToHome } from "@/app/actions/userActions";

export async function POST(req: NextRequest) {
  try {
    const { name, address, userId } = await req.json();

    if (!name || !address || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create home
    const home = await createHome(name, address);

    // Assign user to this home
    await assignUserToHome(userId, home.id);

    return NextResponse.json({ home });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create home" },
      { status: 500 }
    );
  }
}
