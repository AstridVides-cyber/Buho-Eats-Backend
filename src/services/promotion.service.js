import { Promotion } from "../models/promotion.model.js";

//Crear la promocion
export const createPromotion = async (data) => {
    try {
        const newPromotion = new Promotion(data);
        const savedPromotion = await newPromotion.save();
        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

//Obtiene todas las promociones
export const findAllPromotions = async () => {
    try {
        const promotions = await Promotion.find();
        return promotions;
    } catch (error) {
        throw new Error(`Error al obtener las promociones: ${error.message}`);
    }
};

//Obtiene una promocion
export const findPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        return promotion;
    } catch (error) {
        throw new Error(`Error al obtener la promoción: ${error.message}`);
    }
};

//Elimina la promocion
export const deletePromotion = async (id) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(id);
        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
