import { Favorite } from "../models/favorite.model.js";
import createError from "http-errors";

// Crear un nuevo favorito
export const addRestaurantToFavoritesController = async (req, res, next) => {
    const { id } = req.params; 
    const { idRestaurant } = req.body; 

    try {
        // Verificamos si ya existe un favorito para este usuario
        let favorite = await Favorite.findOne({ idUser: id });

        if (!favorite) {
            // Si no existe, creamos uno nuevo
            favorite = new Favorite({
                idUser: id,
                idRestaurant: [idRestaurant],
            });
            await favorite.save();
        } else {
            // Si ya existe, solo agregamos el restaurante
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

// Eliminar un restaurante de los favoritos
export const removeRestaurantFromFavoritesController = async (req, res, next) => {
    const { id, restaurantId } = req.params; 

    try {
        const favorite = await Favorite.findOne({ idUser: id });

        if (!favorite) {
            throw createError(404, "No se encontraron favoritos para este usuario");
        }

        // Eliminamos el restaurante de los favoritos
        favorite.idRestaurant = favorite.idRestaurant.filter(
            (restaurant) => restaurant.toString() !== restaurantId
        );

        await favorite.save();
        res.status(200).json({ success: true, message: "Restaurante eliminado de favoritos" });
    } catch (error) {
        next(error);
    }
};
