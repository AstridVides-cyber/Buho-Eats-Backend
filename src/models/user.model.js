import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    rol: {
        type: String,
        required: true,
        enum: ['usuario', 'admin', 'superadmin'], // Cambiado para coincidir con el frontend
    },
    favoritos: {
        type: [String], // IDs de restaurantes favoritos
        default: [],
    },
});

export const User = model('User', userSchema);
