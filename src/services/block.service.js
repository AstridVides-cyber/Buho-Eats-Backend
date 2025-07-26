import { Block } from "../models/block.model.js";

// Create a new block
export const createBlock = async (restaurantId, userId) => {
    try {
        const existingBlock = await Block.findOne({ blocker: restaurantId, blocked: userId });
        if (existingBlock) throw new Error("El usuario ya está bloqueado");
        
        const newBlock = new Block({ blocker: restaurantId, blocked: userId });
        await newBlock.save();
        return newBlock;
    } catch (error) {
        throw new Error(`Error al bloquear al usuario: ${error.message}`);
    }
};

// Get all blocks for a restaurant
export const deleteBlock = async (restaurantId, userId) => {
    try {
        const removedBlock = await Block.findOneAndDelete({ blocker: restaurantId, blocked: userId });
        return removedBlock;
    } catch (error) {
        throw new Error(`Error al desbloquear al usuario: ${error.message}`);
    }
};
