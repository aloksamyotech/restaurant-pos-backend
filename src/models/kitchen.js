import mongoose, { Schema } from "mongoose";

const kitchenSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    status: {
      type: String,
    },
    completedPercentage: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Kitchen = mongoose.model("Kitchen", kitchenSchema);
