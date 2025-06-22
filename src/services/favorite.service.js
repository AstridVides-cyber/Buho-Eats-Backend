import { Favorite } from "../models/favorite.model.js";
import { User } from "../models/user.model.js"; // Para manipular al Usuario

// Crear un nuevo favorito
export const createFavorite = async (data) => {
    try {
        // Crear un nuevo objeto de favorito
        const newFavorite = new Favorite(data);
        const createdFavorite = await newFavorite.save();

        // Añadir el ID del favorito a la lista de favoritos del usuario
        await User.findByIdAndUpdate(data.idUser, {
            $push: { favorites: createdFavorite._id }
        });

        return createdFavorite;
    } catch (error) {
        throw new Error(`Error al crear el favorito: ${error.message}`);
    }
};

// Obtener todos los favoritos de un usuario
export const getFavoritesByUserId = async (userId) => {
    try {
        const user = await User.findById(userId).populate('favorites');
        return user ? user.favorites : [];
    } catch (error) {
        throw new Error(`Error al obtener los favoritos: ${error.message}`);
    }
};

// Eliminar un favorito y actualizar la lista de favoritos en el usuario
export const deleteFavorite = async (userId, favoriteId) => {
    try {
        // Eliminar el favorito específico
        await Favorite.findByIdAndDelete(favoriteId);

        // Eliminar el favorito de la lista de favoritos del usuario
        await User.findByIdAndUpdate(userId, {
            $pull: { favorites: favoriteId }
        });
    } catch (error) {
        throw new Error(`Error al eliminar el favorito: ${error.message}`);
    }
};
