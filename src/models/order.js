import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    employee: {
      type: String,
    },
    items: [],
    status: {
      type: String,
    },
    expectedTime: {
      type: Number,
      trim: true,
    },
    totalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    paymentStatus: {
      type: Number,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
    },
    chef: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    type: {
      type: String
    },
    table: {
      type: String
    }
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
