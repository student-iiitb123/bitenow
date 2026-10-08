import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foods",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  path: {
    type: String,
    default: "",
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restuarants",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Order must have at least one item",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    delivery_fee: {
      type: Number,
      required: true,
      default: 40,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    delivery_address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["placed", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "placed",
    },
    payment_method: {
      type: String,
      enum: ["cod"],
      default: "cod",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
orderSchema.index({ customer_id: 1, createdAt: -1 });
orderSchema.index({ restaurant_id: 1, createdAt: -1 });

const Order =
  mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
