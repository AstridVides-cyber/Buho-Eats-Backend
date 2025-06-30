import { Schema, model } from "mongoose";

const blockSchema = new Schema({
    blocker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blocked: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Fecha de creación del bloqueo
    },
});

// Evitar bloqueos duplicados: No se puede bloquear a un usuario más de una vez
blockSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

export const Block = model('Block', blockSchema);
