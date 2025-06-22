import { createFavorite, getFavoritesByUserId, deleteFavorite } from "../services/favorite.service.js";
import createError from "http-errors";

// Crear favorito
export const createFavoriteController = async (req, res, next) => {
    const data = req.body;
    try {
        const createdFavorite = await createFavorite(data);
        res.status(201).json({ message: "Favorito creado con éxito", data: createdFavorite });
    } catch (error) {
        next(error);
    }
};

// Obtener favoritos de un usuario
export const getFavoritesByUserIdController = async (req, res, next) => {
    const { idUser } = req.params;
    try {
        const favorites = await getFavoritesByUserId(idUser);
        res.status(200).json({ message: "Favoritos obtenidos", data: favorites });
    } catch (error) {
        next(error);
    }
};

// Eliminar un favorito
export const deleteFavoriteController = async (req, res, next) => {
    const { idUser, favoriteId } = req.params;
    try {
        await deleteFavorite(idUser, favoriteId);
        res.status(200).json({ message: "Favorito eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
