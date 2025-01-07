import mongoose, { Schema } from "mongoose";



const invoiceSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      
      
      
    }
    
    
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
