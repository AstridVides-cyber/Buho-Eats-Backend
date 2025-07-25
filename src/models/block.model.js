import { Schema, model } from "mongoose";

const blockSchema = new Schema({
    blocker: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who is blocking
        required: true,
    },
    blocked: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user being blocked
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the date when the block is created 
    },
});

// Ensure that the combination of blocker and blocked is unique
blockSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

export const Block = model('Block', blockSchema);
