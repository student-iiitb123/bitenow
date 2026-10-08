import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Food from "../../../../lib/food.model";
import mongoose from "mongoose";
import { authenticateRestaurant } from "../../../../lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    await dbConnect();
    const result = await Food.find({ restro_id: id }).lean();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Get foods error:", error.message);
    return NextResponse.json(
      { success: false, result: [], message: "Failed to fetch food items" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
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

    // Verify the food item belongs to this restaurant
    const foodItem = await Food.findById(id);
    if (!foodItem) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    if (foodItem.restro_id.toString() !== auth.user.id) {
      return NextResponse.json(
        { success: false, message: "You can only delete your own food items" },
        { status: 403 }
      );
    }

    await Food.deleteOne({ _id: id });

    return NextResponse.json({ success: true, message: "Food item deleted" });
  } catch (error) {
    console.error("Delete food error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete food item" },
      { status: 500 }
    );
  }
}
