import mongoose, { Schema } from "mongoose";

const expenseTypeSchema = new Schema(
  {
    expenseName: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const ExpenseType = mongoose.model("ExpenseType", expenseTypeSchema);
