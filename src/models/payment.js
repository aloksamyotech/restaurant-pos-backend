import mongoose, { Schema } from "mongoose";



const paymentSchema = new Schema(
  {
    paymentMode: {
      type: String,
      enum: ['Cash', 'UPI', 'Card'],



    },
    amount: {
      type: Number,


    },

    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid'],



    },




  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
