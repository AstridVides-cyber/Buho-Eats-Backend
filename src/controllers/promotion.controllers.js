import { 
    createPromotion, 
    getPromotionsByRestaurantId, 
    getPromotionById, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";
import createError from "http-errors";

// Create promotion controller
export const createPromotionController = async (req, res, next) => {
    try {
        const newPromotion = await createPromotion(req.body);
        res.status(201).json({ success: true, message: "Promoción creada correctamente", data: newPromotion });
    } catch (error) {
        next(error);
    }
};

// Get promotions by restaurant ID
export const getPromotionsController = async (req, res, next) => {
    const { restaurantId } = req.params;
    try {
        const promotions = await getPromotionsByRestaurantId(restaurantId);
        res.status(200).json({ success: true, data: promotions });
    } catch (error) {
        next(error);
    }
};

// Get promotion by ID
export const getPromotionByIdController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        const promotion = await getPromotionById(promotionId);
        if (!promotion) throw new createError(404, "Promoción no encontrada");
        res.status(200).json({ success: true, data: promotion });
    } catch (error) {
        next(error);
    }
};

// Update promotion
export const updatePromotionController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        const updatedPromotion = await updatePromotion(promotionId, req.body);
        if (!updatedPromotion) throw new createError(404, "Promoción no encontrada");
        res.status(200).json({ success: true, message: "Promoción actualizada correctamente", data: updatedPromotion });
    } catch (error) {
        next(error);
    }
};

// Delete promotion
export const deletePromotionController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        const deletedPromotion = await deletePromotion(promotionId);
        if (!deletedPromotion) throw new createError(404, "Promoción no encontrada");
        res.status(200).json({ success: true, message: "Promoción eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};
