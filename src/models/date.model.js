import mongoose, { Schema, model } from 'mongoose';

const timeRangeSchema = new Schema({
    from: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,  // Matches HH:MM format (24-hour clock)
        required: true,
    },
    to: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,   // Matches HH:MM format (24-hour clock)
        required: true,
    },
});

export const timeRange = model('timeRange', timeRangeSchema);
