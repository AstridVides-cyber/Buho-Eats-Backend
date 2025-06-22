import { Favorite } from "../models/favorite.model.js";

// Crear un favorito
export const createFavorite = async (idUser, idRestaurant) => {
    const newFavorite = new Favorite({ idUser, idRestaurant });

    try {
        const favorite = await newFavorite.save();
        return favorite;
    } catch (error) {
        throw new Error(`Error al crear el favorito: ${error.message}`);
    }
};

// Obtener todos los favoritos de un usuario
export const getFavoritesByUser = async (idUser) => {
    try {
        const favorites = await Favorite.find({ idUser }).populate('idRestaurant');
        return favorites;
    } catch (error) {
        throw new Error(`Error al obtener los favoritos: ${error.message}`);
    }
};

// Eliminar un favorito
export const removeFavorite = async (idUser, idRestaurant) => {
    try {
        const favorite = await Favorite.findOneAndDelete({ idUser, idRestaurant });
        return favorite;
    } catch (error) {
        throw new Error(`Error al eliminar el favorito: ${error.message}`);
    }
};
