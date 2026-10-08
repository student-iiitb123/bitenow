import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Restaurant from "../../../lib/restuarant.model";

export async function GET(request) {
  try {
    await dbConnect();

    const queryParams = request.nextUrl.searchParams;

    let filter = {};

    // Filter by city if location is provided
    const city = queryParams.get("location");
    if (city) {
      // Escape regex special characters to prevent ReDoS
      const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.city = { $regex: escaped, $options: "i" };
    }

    // Filter by restaurant name if provided
    const restuarant = queryParams.get("restuarant");
    if (restuarant) {
      const escaped = restuarant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.restuarant = { $regex: escaped, $options: "i" };
    }

    // Fetch restaurants, exclude passwords
    const result = await Restaurant.find(filter).select("-password").lean();

    return NextResponse.json({ return: true, result });
  } catch (error) {
    console.error("Customers API error:", error.message);
    return NextResponse.json(
      { return: false, result: [], message: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}