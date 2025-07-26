import { Router } from "express";
import { 
    addRestaurantToFavoritesController,
    removeRestaurantFromFavoritesController 
} from "../controllers/favorite.controllers.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const favoriteRouter = Router();

// Add restaurant to user's favorites
favoriteRouter.post("/:id/favoritos/add", verifyToken, addRestaurantToFavoritesController);

// Remove restaurant from user's favorites
favoriteRouter.delete("/:id/favoritos/:restaurantId", verifyToken, removeRestaurantFromFavoritesController);

export { favoriteRouter };
