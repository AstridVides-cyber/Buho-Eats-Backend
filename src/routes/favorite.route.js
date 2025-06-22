import { Router } from "express";
import {
    createFavoriteController,
    getFavoritesByUserController,
    removeFavoriteController,
} from "../controllers/favorite.controllers.js";
import {
    validateCreateFavorite,
    validateGetFavoritesByUser,
    validateDeleteFavorite,
} from "../validators/favorite.validator.js";

const favoriteRouter = Router();

// Ruta para crear un favorito
favoriteRouter.post("/create", validateCreateFavorite, createFavoriteController);

// Ruta para obtener los favoritos de un usuario
favoriteRouter.get("/:idUser", validateGetFavoritesByUser, getFavoritesByUserController);

// Ruta para eliminar un favorito
favoriteRouter.delete("/:idUser/:idRestaurant", validateDeleteFavorite, removeFavoriteController);

export { favoriteRouter };
