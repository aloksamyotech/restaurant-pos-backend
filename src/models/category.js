import mongoose, { Schema } from "mongoose";


const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    
    isAvailable: {
      type: Boolean,
      required: true,
      
    },
    image: {
      type: String,
      required: true,
    },
    
   },
  { timestamps: true },
);


export const Category = mongoose.model("Category", categorySchema);
