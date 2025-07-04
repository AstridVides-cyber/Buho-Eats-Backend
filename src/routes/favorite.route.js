import { Router } from "express";
import { 
    addRestaurantToFavoritesController,
    removeRestaurantFromFavoritesController 
} from "../controllers/favorite.controllers.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const favoriteRouter = Router();

// Agregar restaurante a favoritos de un usuario
favoriteRouter.post("/:id/favoritos/add", verifyToken, addRestaurantToFavoritesController);

// Eliminar restaurante de los favoritos de un usuario
favoriteRouter.delete("/:id/favoritos/:restaurantId", verifyToken, removeRestaurantFromFavoritesController);

export { favoriteRouter };
