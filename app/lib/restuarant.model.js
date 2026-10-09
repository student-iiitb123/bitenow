import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },

    restuarant: {
      type: String,
      required: [true, "Restaurant name is required"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (only if modified)
// In Mongoose 8+, async pre-save hooks should return a promise instead of receiving/calling next()
restaurantSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
restaurantSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Never include password in JSON output
restaurantSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Restaurant =
  mongoose.models.restuarants ||
  mongoose.model("restuarants", restaurantSchema);

export default Restaurant;
