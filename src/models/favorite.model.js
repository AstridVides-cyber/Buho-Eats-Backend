import mongoose, { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
    idUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idRestaurant: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
});

export const Favorite = model('Favorite', favoriteSchema);