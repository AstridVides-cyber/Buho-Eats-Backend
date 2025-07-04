import mongoose, { Schema, model } from "mongoose";

const promotionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: {
            before: Number,
            now: Number
        },
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    restaurantId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
});

export const Promotion = model('Promotion', promotionSchema);
