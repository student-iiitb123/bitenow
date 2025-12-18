import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Correct model export (Next.js safe)
const User =
  mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
