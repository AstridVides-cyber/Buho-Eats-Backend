import { Favorite } from "../models/favorite.model.js";

// Create a new favorite
export const createFavorite = async (idUser, idRestaurant) => {
    const newFavorite = new Favorite({
        idUser: idUser,
        idRestaurant: [idRestaurant]
    });

    try {
        const savedFavorite = await newFavorite.save();
        return savedFavorite;
    } catch (error) {
        throw new Error(`Error al crear el favorito: ${error.message}`);
    }
};

// Get all favorites for a user
export const findFavoritesByUserId = async (idUser) => {
    try {
        const favorite = await Favorite.findOne({ idUser: idUser }).populate('idRestaurant');
        return favorite;
    } catch (error) {
        throw new Error(`Error al obtener los favoritos: ${error.message}`);
    }
};

// Remove a favorite by user ID and restaurant ID
export const removeFavorite = async (idUser, restaurantId) => {
    try {
        const favorite = await Favorite.findOne({ idUser: idUser });

        if (!favorite) {
            throw new Error("Favorito no encontrado");
        }

        favorite.idRestaurant = favorite.idRestaurant.filter(
            (restaurant) => restaurant.toString() !== restaurantId
        );

        await favorite.save();
        return favorite;
    } catch (error) {
        throw new Error(`Error al eliminar el favorito: ${error.message}`);
    }
};
