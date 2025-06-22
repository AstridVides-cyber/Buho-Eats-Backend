import { 
    createFavorite, 
    getFavoritesByUser, 
    removeFavorite 
} from "../services/favorite.service.js";
import createError from "http-errors";

// Crear un nuevo favorito
export const createFavoriteController = async (req, res, next) => {
    const { idUser, idRestaurant } = req.body;

    try {
        const favorite = await createFavorite(idUser, idRestaurant);
        res.status(201).json({ message: "Favorito agregado correctamente", data: favorite });
    } catch (error) {
        next(error);
    }
};

// Obtener los favoritos de un usuario
export const getFavoritesByUserController = async (req, res, next) => {
    const { idUser } = req.params;

    try {
        const favorites = await getFavoritesByUser(idUser);
        if (!favorites) throw createError(404, "No se encontraron favoritos para este usuario");
        res.status(200).json({ data: favorites });
    } catch (error) {
        next(error);
    }
};

// Eliminar un favorito
export const removeFavoriteController = async (req, res, next) => {
    const { idUser, idRestaurant } = req.params;

    try {
        const favorite = await removeFavorite(idUser, idRestaurant);
        if (!favorite) throw createError(404, "No se encontró el favorito para eliminar");
        res.status(200).json({ message: "Favorito eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
