import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Restaurant from "../../../../lib/restuarant.model";
import Food from "../../../../lib/food.model";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const restuarant = await Restaurant.findById(id).select("-password").lean();

    if (!restuarant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    const food = await Food.find({ restro_id: id, available: { $ne: false } }).lean();

    return NextResponse.json({ restuarant, food, success: true });
  } catch (error) {
    console.error("Customer detail API error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch restaurant details" },
      { status: 500 }
    );
  }
}