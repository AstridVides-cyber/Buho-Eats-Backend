import { Favorite } from "../models/favorite.model.js";
import createError from "http-errors";

// Create a new favorite controller
export const addRestaurantToFavoritesController = async (req, res, next) => {
    const { id } = req.params; 
    const { idRestaurant } = req.body; 

    try {
        // Check if the user exists
        let favorite = await Favorite.findOne({ idUser: id });

        if (!favorite) {
            // If the user does not have a favorite entry, create one
            favorite = new Favorite({
                idUser: id,
                idRestaurant: [idRestaurant],
            });
            await favorite.save();
        } else {
            // If the user already has a favorite entry, check if the restaurant is already in favorites
            if (!favorite.idRestaurant.includes(idRestaurant)) {
                favorite.idRestaurant.push(idRestaurant);
                await favorite.save();
            }
        }

        res.status(200).json({ success: true, message: "Restaurante agregado a favoritos" });
    } catch (error) {
        next(error);
    }
};


// Remove restaurant from favorites controller
export const removeRestaurantFromFavoritesController = async (req, res, next) => {
    const { id, restaurantId } = req.params; 

    try {
        const favorite = await Favorite.findOne({ idUser: id });

        if (!favorite) {
            throw createError(404, "No se encontraron favoritos para este usuario");
        }

        //  Check if the restaurant is in favorites
        favorite.idRestaurant = favorite.idRestaurant.filter(
            (restaurant) => restaurant.toString() !== restaurantId
        );

        await favorite.save();
        res.status(200).json({ success: true, message: "Restaurante eliminado de favoritos" });
    } catch (error) {
        next(error);
    }
};
