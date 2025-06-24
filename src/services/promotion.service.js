import { Promotion } from "../models/promotion.model.js";
import { Restaurant } from "../models/restaurante.model.js";

// Crear promoción
export const createPromotion = async (restaurantId, promotionData) => {
    const promotion = new Promotion({ ...promotionData, restaurantId });

    try {
        const savedPromotion = await promotion.save();
        await Restaurant.findByIdAndUpdate(restaurantId, {
            $push: { promociones: savedPromotion._id }
        });

        return savedPromotion;
    } catch (error) {
        throw new Error(`Error al crear la promoción: ${error.message}`);
    }
};

// Actualizar promoción
export const updatePromotion = async (restaurantId, promotionId, promotionData) => {
    try {
        const updatedPromotion = await Promotion.findOneAndUpdate(
            { _id: promotionId, restaurantId },
            promotionData,
            { new: true }
        );
        return updatedPromotion;
    } catch (error) {
        throw new Error(`Error al actualizar la promoción: ${error.message}`);
    }
};

// Eliminar promoción
export const deletePromotion = async (restaurantId, promotionId) => {
    try {
        const deletedPromotion = await Promotion.findOneAndDelete({ _id: promotionId, restaurantId });

        
        await Restaurant.findByIdAndUpdate(restaurantId, {
            $pull: { promociones: promotionId }
        });

        return deletedPromotion;
    } catch (error) {
        throw new Error(`Error al eliminar la promoción: ${error.message}`);
    }
};
