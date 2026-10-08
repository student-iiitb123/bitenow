import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Restaurant from "../../../../lib/restuarant.model";

export async function GET() {
  try {
    await dbConnect();

    // Use distinct() for efficiency instead of fetching all documents
    const cities = await Restaurant.distinct("city");

    // Capitalize first letter and deduplicate
    const result = [
      ...new Set(
        cities.map(
          (city) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
        )
      ),
    ].sort();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Location API error:", error.message);
    return NextResponse.json(
      { result: [], success: false, message: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
