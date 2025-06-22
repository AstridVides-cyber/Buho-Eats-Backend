import { 
    createPromotion,
    findAllPromotions,
    findPromotionById,
    updatePromotionById,
    deletePromotionById
} from "../services/promotion.service.js";
import createError from "http-errors";

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    const promotionData = req.body;
    
    try {
        const promotion = await createPromotion(promotionData);
        res.status(201).json({ message: "Promoción creada correctamente", data: promotion });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las promociones
export const findAllPromotionsController = async (req, res, next) => {
    try {
        const promotions = await findAllPromotions();
        res.status(200).json({ message: "Promociones obtenidas correctamente", data: promotions });
    } catch (error) {
        next(error);
    }
};

// Obtener promoción por ID
export const findPromotionByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const promotion = await findPromotionById(id);
        if (!promotion) throw createError(404, "Promoción no encontrada");
        res.status(200).json({ message: "Promoción obtenida correctamente", data: promotion });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { id } = req.params;
    const promotionData = req.body;

    try {
        const promotion = await findPromotionById(id);
        if (!promotion) throw createError(404, "Promoción no encontrada");

        const updatedPromotion = await updatePromotionById(id, promotionData);
        res.status(200).json({ message: "Promoción actualizada correctamente", data: updatedPromotion });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const promotion = await findPromotionById(id);
        if (!promotion) throw createError(404, "Promoción no encontrada");

        await deletePromotionById(id);
        res.status(200).json({ message: "Promoción eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};
