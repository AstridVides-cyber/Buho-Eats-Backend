import mongoose, { Schema, model } from 'mongoose';

const plateSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String, // Cambiado a string para coincidir con el frontend
        required: true,
    },
    imageUrl: {
        type: String, // Ahora es string, no referencia a Picture
        required: true,
    },
    idRestaurant: {
        type: String, // Puede ser ObjectId si lo prefieres
        required: true,
    }
});

export const Plate = model('Plate', plateSchema);
