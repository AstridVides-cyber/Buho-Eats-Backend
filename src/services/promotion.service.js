import { Promotion } from "../models/promotion.model.js";

// Crear promoción
export const createPromotion = async (data) => {
    try {
        const newPromotion = new Promotion(data);
        const savedPromotion = await newPromotion.save();
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

// Obtener promoción por ID
export const findPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción: ${error.message}`);
    }
};

// Actualizar promoción
export const updatePromotion = async (id, data) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(id, data, { new: true });
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
