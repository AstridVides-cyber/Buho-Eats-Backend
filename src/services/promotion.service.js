import { Promotion } from "../models/promotion.model.js";

// Crear promoción
export const createPromotion = async (promotionData) => {
    try {
        const promotion = new Promotion(promotionData);
        const savedPromotion = await promotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

// Obtener todas las promociones
export const findAllPromotions = async () => {
    try {
        const promotions = await Promotion.find();
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

// Obtener una promoción por ID
export const findPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción por ID: ${error.message}`);
    }
};

// Actualizar una promoción
export const updatePromotionById = async (id, promotionData) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(id, promotionData, { new: true });
        return updatedPromotion;
    } catch (error) {
        throw new Error(`Error al actualizar la promoción: ${error.message}`);
    }
};

// Eliminar una promoción
export const deletePromotionById = async (id) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(id);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
