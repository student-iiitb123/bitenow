import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,   
        required: true
    },

    img_path: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    restro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",   
        required: true

    }
});

const Food = mongoose.models.foods || mongoose.model("foods", foodSchema);

export default Food;

