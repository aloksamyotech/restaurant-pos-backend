import mongoose, { Schema } from "mongoose";


const ingredientSchema = new Schema(
  {
    ingredientName: {
      type: String,
      required: true,
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
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    unit: {
        type: String,
        required: true, 
        enum : ['kg','ltr','pieces'],
      },
    refreshToken: {
      type: String,
      default:null
    },
    companyId: {
      type : mongoose.Types.ObjectId,
     
    }
  },
  { timestamps: true },
);






export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
