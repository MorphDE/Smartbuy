import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true, trim: true },
    address: {
      street: { type: String, required: true },
      houseNumber: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true }
    },
    isAdmin: { type: Boolean, default: false }
  },
  { collection: "users", timestamps: true }
);

export const Users = mongoose.model("users", usersSchema);