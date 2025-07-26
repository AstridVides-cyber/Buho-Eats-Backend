import { Promotion } from "../models/promotion.model.js";

// Create a new promotion
export const createPromotion = async (data) => {
    try {
        const promotion = new Promotion(data);
        const savedPromotion = await promotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

// Get all promotions by restaurant ID
export const getPromotionsByRestaurantId = async (restaurantId) => {
    try {
        const promotions = await Promotion.find({ restaurantId });
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

// Get a promotion by ID
export const getPromotionById = async (promotionId) => {
    try {
        const promotion = await Promotion.findById(promotionId);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción por ID: ${error.message}`);
    }
};

// Update a promotion by ID
export const updatePromotion = async (promotionId, data) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, data, { new: true });
        return updatedPromotion;
    } catch (error) {
        throw new Error(`Error al actualizar la promoción: ${error.message}`);
    }
};

// Delete a promotion by ID
export const deletePromotion = async (promotionId) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(promotionId);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
