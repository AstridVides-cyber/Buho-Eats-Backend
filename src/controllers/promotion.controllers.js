import createError from "http-errors";
import { 
    createPromotion,
    getPromotionsByRestaurant, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";

import createError from "http-errors";
import { createPromotion,  } from "../services/promotion.service.js";

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    const { id } = req.params; 
    const { title, description, price, rules } = req.body;

    // Validación para asegurarnos de que los campos están presentes
    if (!title || !description || !price || !rules) {
        return res.status(400).json({
            success: false,
            message: "Todos los campos (title, description, price, rules) son obligatorios."
        });
    }

    const promotionData = {
        restaurantId: id,  // Usamos el id que viene en la URL
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

// Obtener todas las promociones de un restaurante
export const getPromotionsController = async (req, res, next) => {
    const { id } = req.params; 

    try {
        const promotions = await getPromotionsByRestaurant(id);
        if (!promotions) {
            throw new createError(404, "No se encontraron promociones para este restaurante");
        }
        res.status(200).json({ data: promotions });
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
