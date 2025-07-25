import mongoose, { model, Schema } from "mongoose";

const picture = new Schema({
    url: {
        type: [String],
        required: true,
    },
    idRestaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Reference to the restaurant:D
        required: true
    }
});

export const Picture = model('Picture', picture);