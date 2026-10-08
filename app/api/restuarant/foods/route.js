import { NextResponse } from "next/server";
import Food from "../../../lib/food.model";
import dbConnect from "../../../lib/db";
import { authenticateRestaurant } from "../../../lib/auth";

export async function POST(request) {
  try {
    // Authenticate restaurant owner
    const auth = await authenticateRestaurant(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    await dbConnect();
    const payload = await request.json();

    const { name, price, path, description } = payload;

    // Validate required fields
    if (!name || price === undefined || price === null || !path || !description) {
      return NextResponse.json(
        { success: false, message: "All fields are required (name, price, path, description)" },
        { status: 400 }
      );
    }

    // Validate price
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { success: false, message: "Price must be a valid non-negative number" },
        { status: 400 }
      );
    }

    // Use the authenticated restaurant's ID, not the one from the client
    const restro_id = auth.user.id;

    const newFoodItem = new Food({
      name,
      price: numericPrice,
      path,
      description,
      restro_id,
    });

    const result = await newFoodItem.save();

    return NextResponse.json(
      { success: true, result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add food error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to add food item" },
      { status: 500 }
    );
  }
}
