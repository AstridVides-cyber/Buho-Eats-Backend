import mongoose, { Schema, model } from 'mongoose';

const timeRangeSchema = new Schema({
    from: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,  // Formato de hora 24h
        required: true,
    },
    to: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,  // Formato de hora 24h
        required: true,
    },
});

export const timeRange = model('timeRange', timeRangeSchema);
