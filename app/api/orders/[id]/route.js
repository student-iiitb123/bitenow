import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Order from "../../../lib/order.model";
import { authenticate } from "../../../lib/auth";
import mongoose from "mongoose";

// Valid status transitions
const VALID_TRANSITIONS = {
  placed: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["out_for_delivery"],
  out_for_delivery: ["delivered"],
  delivered: [],
  cancelled: [],
};

/**
 * GET /api/orders/[id] — Get a specific order
 */
export async function GET(request, { params }) {
  try {
    const auth = await authenticate(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Verify the user owns this order (customer or restaurant)
    const isCustomer =
      auth.user.role === "customer" &&
      order.customer_id.toString() === auth.user.id;
    const isRestaurant =
      auth.user.role === "restaurant" &&
      order.restaurant_id.toString() === auth.user.id;

    if (!isCustomer && !isRestaurant) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Get order error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id] — Update order status
 * Restaurant can update status through valid transitions
 * Customer can cancel if order is in "placed" status
 */
export async function PUT(request, { params }) {
  try {
    const auth = await authenticate(request);
    if (!auth.success) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status: newStatus } = body;

    if (!newStatus) {
      return NextResponse.json(
        { success: false, message: "New status is required" },
        { status: 400 }
      );
    }

    // Verify access and permissions
    const isCustomer =
      auth.user.role === "customer" &&
      order.customer_id.toString() === auth.user.id;
    const isRestaurant =
      auth.user.role === "restaurant" &&
      order.restaurant_id.toString() === auth.user.id;

    if (!isCustomer && !isRestaurant) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    // Customers can only cancel placed orders
    if (isCustomer && newStatus !== "cancelled") {
      return NextResponse.json(
        { success: false, message: "Customers can only cancel orders" },
        { status: 403 }
      );
    }

    if (isCustomer && order.status !== "placed") {
      return NextResponse.json(
        { success: false, message: "Can only cancel orders that are not yet confirmed" },
        { status: 400 }
      );
    }

    // Validate status transition
    const allowedTransitions = VALID_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot change status from '${order.status}' to '${newStatus}'. Allowed: ${allowedTransitions.join(", ") || "none"}`,
        },
        { status: 400 }
      );
    }

    order.status = newStatus;
    const updatedOrder = await order.save();

    return NextResponse.json({
      success: true,
      message: `Order status updated to '${newStatus}'`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}
