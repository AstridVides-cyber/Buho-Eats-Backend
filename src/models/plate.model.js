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
        type: Number,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture',  
        required: true,
    },
});

export const Plate = model('Plate', plateSchema);
