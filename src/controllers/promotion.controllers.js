import createError from "http-errors";
import { 
    createPromotion, 
    getPromotionsByRestaurant, 
    getPromotionById, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, rules } = req.body;

    const promotionData = {
        restaurantId: id, 
        title,
        description,
        price,
        rules
    };

    try {
        const promotion = await createPromotion(promotionData);
        res.status(201).json({
            success: true,
            message: "Promoción creada correctamente",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

// Obtener promociones por restaurante
export const getPromotionsController = async (req, res, next) => {
    const { id } = req.params; 

    try {
        const promotions = await getPromotionsByRestaurant(id);
        if (!promotions) 
            throw new createError(404, "No se encontraron promociones para este restaurante");
        res.status(200)
        .json({ success: true, data: promotions });
    } catch (error) {
        next(error);
    }
};

// Obtener promoción por ID
export const getPromotionByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const promotion = await getPromotionById(id);
        if (!promotion) 
            throw new createError(404, "No se encontró la promoción");
        res.status(200)
        .json({ success: true, data: promotion });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, rules } = req.body;

    const promotionData = { title, description, price, rules };

    try {
        const promotion = await updatePromotion(id, promotionData);
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
    const { id } = req.params;

    try {
        await deletePromotion(id);
        res.status(200).json({
            success: true,
            message: "Promoción eliminada correctamente"
        });
    } catch (error) {
        next(error);
    }
};
