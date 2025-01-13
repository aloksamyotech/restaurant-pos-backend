import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
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
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    discount: {
      type: Number,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
    },
    totalServing: {
      type: Number,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    ingredientId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Item = mongoose.model("Item", itemSchema);
