import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true, 
    },
    stars: {
        type: Number,
        required: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user:D
        required: true,
    },
    idrestaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant', // Reference to the restaurant:D
        required: true,
    },
    
});

export const Review = model('Review', reviewSchema);