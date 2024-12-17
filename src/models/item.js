import mongoose, { Schema } from "mongoose";


const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    
    active: {
      type: Boolean,
      default: true,
      
    },
    image: {
      type: String,
      required: true,
    },
    discount: {
        type: Number,
        required: true,
        trim: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      rating : {
        type: Number,
        required: true,
        trim: true,
      },
      totalServing : {
        type: Number,
        required: true,
        trim: true,
      },
      cost : {
        type: Number,
        required: true,
        trim: true,
      },
      price : {
        type: Number,
        required: true,
        trim: true,
      },
      ingredient : {
        type: Array,
        required: true,
        trim: true,
      },
      itemId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"categoryName",
        required: true,
        trim: true,
      },
      categoryName: {
        type: String,
        required: true,
        trim: true,
      },
      
    
   
  
  },
  { timestamps: true },
);


export const Item = mongoose.model("Item", itemSchema);
