import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,

      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,

      enum: ["superAdmin", "Manager", "OrderTaker", "Chef"],
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
    },
    currency: {
      type: String,
    },
    tax: {
      type: Number,
    },
    companyLogo: {
      type: String,
    },
    permissions: {
      type: [],
    },
    refreshToken: {
      type: String,
      default: null,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true },
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

employeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

employeeSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    permissions: this.permissions,
    firstName: this.firstName,
    role: this.role,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

employeeSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const Employee = mongoose.model("Employee", employeeSchema);
