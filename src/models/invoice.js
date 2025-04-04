import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    customerName: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    amount: {
      type: Number,
    },

    items: [],
    invoicePdfUrl : {
      type: String,
      
    }
  },
  { timestamps: true },
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
