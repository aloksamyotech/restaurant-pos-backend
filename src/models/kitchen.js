import mongoose, { Schema } from "mongoose";

const kitchenSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required : true
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
      default:0
    },
    note: {
      type: String,
    },
    table:{
      type:String,
    }
  },
  { timestamps: true },
);

export const Kitchen = mongoose.model("Kitchen", kitchenSchema);
