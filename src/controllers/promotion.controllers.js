import createError from "http-errors";
import { 
    createPromotion, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";

// Crear una promoción
export const createPromotionController = async (req, res, next) => {
    const { id } = req.params;  
    const data = req.body;
    try {
        const promotion = await createPromotion(id, data);
        res.status(201).json({
            success: true,
            message: "Promoción creada correctamente",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { id, idPromo } = req.params;  
    const data = req.body;
    try {
        const promotion = await updatePromotion(id, idPromo, data);
        if (!promotion) throw createError(404, "No se encontró la promoción");
        res.status(200).json({
            success: true,
            message: "Promoción actualizada correctamente",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { id, idPromo } = req.params;  
    try {
        const deletedPromotion = await deletePromotion(id, idPromo);
        res.status(200).json({
            success: true,
            message: "Promoción eliminada correctamente",
            data: deletedPromotion
        });
    } catch (error) {
        next(error);
    }
};
