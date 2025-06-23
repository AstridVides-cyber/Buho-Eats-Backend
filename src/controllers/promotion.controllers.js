import { 
    createPromotion, 
    getAllPromotions, 
    getPromotionsByRestaurant, 
    deletePromotionById 
} from "../services/promotion.service.js";
import createError from "http-errors";

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    const data = req.body;
    try {
        const promotion = await createPromotion(data);
        res.status(201).json({ message: "Promoción creada", data: promotion });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las promociones
export const getAllPromotionsController = async (req, res, next) => {
    try {
        const promotions = await getAllPromotions();
        res.status(200).json({ data: promotions });
    } catch (error) {
        next(error);
    }
};

// Obtener promociones por restaurante
export const getPromotionsByRestaurantController = async (req, res, next) => {
    const { restaurantId } = req.params;
    try {
        const promotions = await getPromotionsByRestaurant(restaurantId);
        if (promotions.length === 0) throw createError(404, "No hay promociones para este restaurante");
        res.status(200).json({ data: promotions });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const promotion = await deletePromotionById(id);
        if (!promotion) throw createError(404, "Promoción no encontrada");
        res.status(200).json({ message: "Promoción eliminada" });
    } catch (error) {
        next(error);
    }
};
