import { 
    createPromotion, 
    getPromotionsByRestaurantId, 
    getPromotionById, 
    updatePromotion, 
    deletePromotion 
} from "../services/promotion.service.js";
import { Restaurant } from "../models/restaurante.model.js";
import { Promotion } from "../models/promotion.model.js";
import createError from "http-errors";

// Utilidad para construir la URL completa de la imagen de promoción
const getPromotionImageUrl = (req, filename) => {
    if (!filename) return null;
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// Crear promoción
export const createPromotionController = async (req, res, next) => {
    try {
        const newPromotion = await createPromotion(req.body);

        // Agregar la promoción al arreglo promos del restaurante correspondiente
        if (newPromotion.restaurantId) {
            // Construir el objeto promo para el arreglo promos
            const promoForMenu = {
                id: newPromotion._id.toString(),
                name: newPromotion.name,
                description: newPromotion.description,
                imageUrl: newPromotion.imageUrl,
                price: newPromotion.price,
                promprice: newPromotion.promprice,
                reglas: newPromotion.reglas,
                restaurantId: newPromotion.restaurantId
            };
            await Restaurant.findByIdAndUpdate(
                newPromotion.restaurantId,
                { $push: { promos: promoForMenu } },
                { new: true }
            );
        }

        // Transformar la promoción para el frontend
        const p = newPromotion;
        const promoForFrontend = {
            id: p._id,
            name: p.name,
            description: p.description,
            imageUrl: p.imageUrl,
            price: p.price,
            promprice: p.promprice,
            reglas: p.reglas,
            restaurantId: p.restaurantId?.toString() || ''
        };
        res.status(201).json({ success: true, message: "Promoción creada correctamente", data: promoForFrontend });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las promociones de un restaurante (ahora lee el array promos del restaurante)
export const getPromotionsController = async (req, res, next) => {
    const { restaurantId } = req.params;
    console.log("Buscando restaurante con ID:", restaurantId);
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            console.log("No se encontró el restaurante con ese ID en la base de datos");
            return res.status(404).json({ success: false, message: "Restaurante no encontrado" });
        }
        res.status(200).json({ success: true, data: restaurant.promos || [] });
    } catch (error) {
        console.error("Error al buscar restaurante:", error);
        next(error);
    }
};

// Obtener todas las promociones globales
export const getAllPromotionsController = async (req, res, next) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json({ success: true, data: promotions });
    } catch (error) {
        next(error);
    }
};

// Obtener promoción por ID
export const getPromotionByIdController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        const promotion = await getPromotionById(promotionId);
        if (!promotion) throw new createError(404, "Promoción no encontrada");
        const promoForFrontend = {
            id: promotion._id,
            name: promotion.name,
            description: promotion.description,
            imageUrl: promotion.imageUrl,
            price: promotion.price,
            promprice: promotion.promprice,
            reglas: promotion.reglas,
            restaurantId: promotion.restaurantId?.toString() || ''
        };
        res.status(200).json({ success: true, data: promoForFrontend });
    } catch (error) {
        next(error);
    }
};

// Actualizar promoción
export const updatePromotionController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = req.file.filename;
        }
        const updatedPromotion = await updatePromotion(promotionId, updateData);
        if (!updatedPromotion) throw new createError(404, "Promoción no encontrada");

        // Actualizar la promo embebida en el restaurante
        if (updatedPromotion && updatedPromotion.restaurantId) {
            await Restaurant.updateOne(
                { _id: updatedPromotion.restaurantId, "promos.id": promotionId },
                {
                    $set: {
                        "promos.$.name": updatedPromotion.name,
                        "promos.$.description": updatedPromotion.description,
                        "promos.$.imageUrl": getPromotionImageUrl(req, updatedPromotion.imageUrl),
                        "promos.$.price": updatedPromotion.price,
                        "promos.$.promprice": updatedPromotion.promprice,
                        "promos.$.reglas": updatedPromotion.reglas
                    }
                }
            );
        }

        const promoForFrontend = {
            id: updatedPromotion._id,
            name: updatedPromotion.name,
            description: updatedPromotion.description,
            imageUrl: updatedPromotion.imageUrl,
            price: updatedPromotion.price,
            promprice: updatedPromotion.promprice,
            reglas: updatedPromotion.reglas,
            restaurantId: updatedPromotion.restaurantId?.toString() || ''
        };
        res.status(200).json({ success: true, message: "Promoción actualizada correctamente", data: promoForFrontend });
    } catch (error) {
        next(error);
    }
};

// Eliminar promoción
export const deletePromotionController = async (req, res, next) => {
    const { promotionId } = req.params;
    try {
        // 1. Eliminar de la colección global
        const deletedPromotion = await deletePromotion(promotionId);
        if (!deletedPromotion) throw new createError(404, "Promoción no encontrada");

        // 2. Eliminar del array promos del restaurante correspondiente
        const restaurantId = deletedPromotion.restaurantId;
        if (restaurantId) {
            await Restaurant.findByIdAndUpdate(
                restaurantId,
                { $pull: { promos: { id: promotionId } } },
                { new: true }
            );
        }

        res.status(200).json({ success: true, message: "Promoción eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};
