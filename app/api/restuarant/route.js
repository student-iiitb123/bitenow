import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ result: true });
  } catch (error) {
    return NextResponse.json({ result: false, error: error.message });
  }
}
