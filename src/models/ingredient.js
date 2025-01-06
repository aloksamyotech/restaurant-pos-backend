import mongoose, { Schema } from "mongoose";


const ingredientSchema = new Schema(
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
      trim: true,
    },
    
    price: {
      type: Number,
      required: true,
      
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
      isAvailable: {
        type: Boolean,
        default:true,
        
        }
  
   
  },
  { timestamps: true },
);






export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
