import { Router } from "express";
import { 
    addRestaurantToFavoritesController,
    removeRestaurantFromFavoritesController 
} from "../controllers/favorite.controllers.js";

const favoriteRouter = Router();

// **Agregar restaurante a favoritos de un usuario**
favoriteRouter.post("/:id/favoritos/add", addRestaurantToFavoritesController);

// **Eliminar restaurante de los favoritos de un usuario**
favoriteRouter.delete("/:id/favoritos/:restaurantId", removeRestaurantFromFavoritesController);

export { favoriteRouter };
