import mongoose, { Schema } from "mongoose";



const orderSchema = new Schema(
  {
    customer: {
      type: String,
      required: false,
      
      
    },
    employee: {
      type: String,
      
    },
    items: [],
    status: {
      type: String,
    },
    expectedTime: {
      type: Number,
      trim: true,
    },
    totalPrice: {
      type: Number,
      
    },
    discount: {
      type: Number,
      
    },
    tax: {
      type: Number,
      
    },
    paymentStatus: {
      type: Number,
      
    },
    paymentMode:
    {
      type: String,
      enum : ['Cash','UPI','Card'],
    },
    chef: { 
      type: Number,
    },
    type: {

    },
    
    
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
