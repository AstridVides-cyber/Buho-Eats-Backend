import { Promotion } from "../models/promotion.model.js";
import createError from "http-errors";

// Crear una nueva promoción
export const createPromotion = async (data) => {
    try {
        const promotion = new Promotion(data);
        const savedPromotion = await promotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

// Obtener todas las promociones
export const getAllPromotions = async () => {
    try {
        const promotions = await Promotion.find();
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

// Obtener promociones de un restaurante específico
export const getPromotionsByRestaurant = async (restaurantId) => {
    try {
        const promotions = await Promotion.find({ restaurantId });
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones del restaurante: ${error.message}`);
    }
};

// Eliminar una promoción por ID
export const deletePromotionById = async (id) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(id);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
