import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import Order from "../../lib/order.model";
import Food from "../../lib/food.model";
import { authenticateCustomer, authenticate } from "../../lib/auth";
import mongoose from "mongoose";

/**
 * POST /api/orders — Create a new order
 * Requires customer authentication
 * Server validates items, calculates totals from DB prices
 */
export async function POST(request) {
  try {
    const auth = await authenticateCustomer(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    await dbConnect();

    const body = await request.json();
    const { items, delivery_address, restaurant_id } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    if (!restaurant_id || !mongoose.Types.ObjectId.isValid(restaurant_id)) {
      return NextResponse.json(
        { success: false, message: "Valid restaurant ID is required" },
        { status: 400 }
      );
    }

    if (!delivery_address || !delivery_address.fullName || !delivery_address.phone ||
        !delivery_address.address || !delivery_address.city) {
      return NextResponse.json(
        { success: false, message: "Complete delivery address is required (fullName, phone, address, city)" },
        { status: 400 }
      );
    }

    // Validate and fetch actual food items from database
    const foodIds = items.map((item) => {
      if (!item.food_id || !mongoose.Types.ObjectId.isValid(item.food_id)) {
        return null;
      }
      return item.food_id;
    });

    if (foodIds.includes(null)) {
      return NextResponse.json(
        { success: false, message: "Invalid food item ID in order" },
        { status: 400 }
      );
    }

    // Fetch actual food items from database (trusted prices)
    const dbFoods = await Food.find({
      _id: { $in: foodIds },
      available: { $ne: false },
    }).lean();

    if (dbFoods.length !== foodIds.length) {
      return NextResponse.json(
        { success: false, message: "Some items are no longer available" },
        { status: 400 }
      );
    }

    // Verify all items belong to the same restaurant
    const allSameRestaurant = dbFoods.every(
      (food) => food.restro_id.toString() === restaurant_id
    );
    if (!allSameRestaurant) {
      return NextResponse.json(
        { success: false, message: "All items must be from the same restaurant" },
        { status: 400 }
      );
    }

    // Build order items with server-side prices
    const orderItems = items.map((item) => {
      const dbFood = dbFoods.find(
        (f) => f._id.toString() === item.food_id
      );

      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));

      return {
        food_id: dbFood._id,
        name: dbFood.name,
        price: dbFood.price,
        quantity,
        path: dbFood.path || "",
      };
    });

    // Calculate totals on the server
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const delivery_fee = 40;
    const total = subtotal + delivery_fee;

    // Create the order
    const order = new Order({
      customer_id: auth.user.id,
      restaurant_id,
      items: orderItems,
      subtotal,
      delivery_fee,
      total,
      delivery_address: {
        fullName: delivery_address.fullName.trim(),
        phone: delivery_address.phone.trim(),
        address: delivery_address.address.trim(),
        city: delivery_address.city.trim(),
      },
      status: "placed",
      payment_method: "cod",
    });

    const savedOrder = await order.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: savedOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders — Get order history for authenticated user
 * Returns customer orders or restaurant orders based on role
 */
export async function GET(request) {
  try {
    const auth = await authenticate(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    await dbConnect();

    let filter = {};
    if (auth.user.role === "customer") {
      filter.customer_id = auth.user.id;
    } else if (auth.user.role === "restaurant") {
      filter.restaurant_id = auth.user.id;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
