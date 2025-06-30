import mongoose, { Schema, model } from 'mongoose';

const coordinateSchema = new Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

export const Coordinate = model('Coordinate', coordinateSchema);
