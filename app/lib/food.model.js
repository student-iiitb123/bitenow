import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Food name is required"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },

  path: {
    type: String,
    required: [true, "Image path is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },

  restro_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restuarants",
    required: [true, "Restaurant ID is required"],
  },

  available: {
    type: Boolean,
    default: true,
  },
});

foodSchema.index({ restro_id: 1 });

const Food = mongoose.models.foods || mongoose.model("foods", foodSchema);

export default Food;
