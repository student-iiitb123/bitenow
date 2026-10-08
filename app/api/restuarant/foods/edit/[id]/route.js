import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/db";
import Food from "../../../../../lib/food.model";
import mongoose from "mongoose";
import { authenticateRestaurant } from "../../../../../lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid food item ID" },
        { status: 400 }
      );
    }

    await dbConnect();
    const result = await Food.findById(id).lean();

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Get food item error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch food item" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    // Authenticate restaurant owner
    const auth = await authenticateRestaurant(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid food item ID" },
        { status: 400 }
      );
    }

    // Verify ownership
    const existingFood = await Food.findById(id);
    if (!existingFood) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    if (existingFood.restro_id.toString() !== auth.user.id) {
      return NextResponse.json(
        { success: false, message: "You can only edit your own food items" },
        { status: 403 }
      );
    }

    const payload = await request.json();

    // Only allow specific fields to be updated (prevent mass assignment)
    const allowedUpdates = {};
    if (payload.name) allowedUpdates.name = payload.name;
    if (payload.description) allowedUpdates.description = payload.description;
    if (payload.path) allowedUpdates.path = payload.path;
    if (payload.available !== undefined) allowedUpdates.available = payload.available;

    if (payload.price !== undefined) {
      const numericPrice = Number(payload.price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        return NextResponse.json(
          { success: false, message: "Price must be a valid non-negative number" },
          { status: 400 }
        );
      }
      allowedUpdates.price = numericPrice;
    }

    const result = await Food.findByIdAndUpdate(id, allowedUpdates, {
      new: true,
      runValidators: true,
    }).lean();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Update food error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update food item" },
      { status: 500 }
    );
  }
}