import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.user || mongoose.model("User", userSchema);