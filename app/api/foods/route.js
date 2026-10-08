import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import Food from "../../lib/food.model";

// Public endpoint to search foods across all restaurants
export async function GET(request) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    let filter = { available: { $ne: false } };
    if (query) {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escaped, $options: "i" };
    }

    const result = await Food.find(filter).limit(50).lean();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Foods search error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}
