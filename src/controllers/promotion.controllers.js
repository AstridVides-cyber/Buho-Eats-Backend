import {
    createPromotion,
    findAllPromotions,
    findPromotionById,
    updatePromotion,
    deletePromotion
} from "../services/promotion.service.js";
import createError from "http-errors";

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    const data = req.body;
    try {
        const promotion = await createPromotion(data);
        res.status(201).json({ message: "Promoción creada correctamente", data: promotion });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las promociones
export const findAllPromotionsController = async (req, res, next) => {
    try {
        const promotions = await findAllPromotions();
        res.status(200).json({ data: promotions });
    } catch (error) {
        next(error);
    }
};

// Obtener promoción por ID
export const findPromotionByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const promotion = await findPromotionById(id);
        if (!promotion) throw createError(404, "No se encontró la promoción");
        res.status(200).json({ data: promotion });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const promotion = await updatePromotion(id, data);
        if (!promotion) throw createError(404, "No se encontró la promoción");
        res.status(200).json({ message: "Promoción actualizada correctamente", data: promotion });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPromotion = await deletePromotion(id);
        res.status(200).json({ message: "Promoción eliminada correctamente", data: deletedPromotion });
    } catch (error) {
        next(error);
    }
};
