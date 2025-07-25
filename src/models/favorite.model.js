import mongoose, { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
    idUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user:D
        required: true,
    },
    idRestaurant: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',  // Reference to the restaurant:D
        required: true,
    }],
});

export const Favorite = model('Favorite', favoriteSchema);