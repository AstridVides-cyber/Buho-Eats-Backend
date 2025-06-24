import { Promotion } from "../models/promotion.model.js";

// Crear promoción
export const createPromotion = async (promotionData) => {
    try {
        const newPromotion = new Promotion(promotionData);
        const savedPromotion = await newPromotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

// Obtener promociones por restaurante
export const getPromotionsByRestaurant = async (restaurantId) => {
    try {
        const promotions = await Promotion.find({ restaurantId });
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

// Obtener promoción por ID
export const getPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción: ${error.message}`);
    }
};

// Actualizar promoción
export const updatePromotion = async (id, promotionData) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(id, promotionData, { new: true });
        return updatedPromotion;
    } catch (error) {
        throw new Error(`Error al actualizar la promoción: ${error.message}`);
    }
};

// Eliminar promoción
export const deletePromotion = async (id) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(id);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
