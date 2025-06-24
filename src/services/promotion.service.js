import { Promotion } from "../models/promotion.model.js";

//Crear promocion
export const createPromotion = async (data) => {
    try {
        const promotion = new Promotion(data);
        const savedPromotion = await promotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

//Obtener las promociones por ID
export const getPromotionsByRestaurantId = async (restaurantId) => {
    try {
        const promotions = await Promotion.find({ restaurantId });
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

//Obtener la promocion por ID
export const getPromotionById = async (promotionId) => {
    try {
        const promotion = await Promotion.findById(promotionId);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción por ID: ${error.message}`);
    }
};

//Actualizar la promocion
export const updatePromotion = async (promotionId, data) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, data, { new: true });
        return updatedPromotion;
    } catch (error) {
        throw new Error(`Error al actualizar la promoción: ${error.message}`);
    }
};

//Eliminar la promocion
export const deletePromotion = async (promotionId) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(promotionId);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
