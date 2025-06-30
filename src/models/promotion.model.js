import mongoose, { Schema, model } from "mongoose";

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    promprice: {
        type: String,
        required: true
    },
    reglas: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String, // Puede ser ObjectId si lo prefieres
        required: true
    }
});

export const Promotion = model('Promotion', promotionSchema);
