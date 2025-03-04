import mongoose, { Schema } from "mongoose";

const tableSchema = new Schema(
  {
    tableNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum:["Vacant","Occupied"]
    },
    space: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Table = mongoose.model("Table", tableSchema);
