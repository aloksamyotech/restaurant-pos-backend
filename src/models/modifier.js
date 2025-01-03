import mongoose, { Schema } from "mongoose";

const modifierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default:true,
      
      }
  },
  { timestamps: true }
);

export const Modifier = mongoose.model("Modifier", modifierSchema);
