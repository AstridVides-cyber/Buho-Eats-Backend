import createError from "http-errors";
import { 
    createPromotion, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";

// Crear una promoción
export const createPromotionController = async (req, res, next) => {
    const { restaurantId } = req.params;  
    const data = req.body;
    try {
        const promotion = await createPromotion(restaurantId, data);
        res.status(201).json({
            message: "Promoción creada correctamente",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { restaurantId, idPromo } = req.params;  
    const data = req.body;
    try {
        const promotion = await updatePromotion(restaurantId, idPromo, data);
        if (!promotion) throw createError(404, "No se encontró la promoción");
        res.status(200).json({
            message: "Promoción actualizada correctamente",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { restaurantId, idPromo } = req.params;  
    try {
        const deletedPromotion = await deletePromotion(restaurantId, idPromo);
        res.status(200).json({
            success: true,
            message: "Promoción eliminada correctamente",
            data: deletedPromotion
        });
    } catch (error) {
        next(error);
    }
};
