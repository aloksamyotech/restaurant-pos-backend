import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    customerName: {
      type: String,
    },
    email: {
      type: String,
    },

    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Customer = mongoose.model("Customer", customerSchema);
