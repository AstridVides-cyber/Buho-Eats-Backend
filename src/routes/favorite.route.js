import { Router } from "express";
import { 
    createFavoriteController, 
    getFavoritesByUserIdController, 
    deleteFavoriteController 
} from "../controllers/favorite.controllers.js";
import { 
    validateCreateFavorite, 
    validateDeleteFavorite 
} from "../validators/favorite.validator.js";

const favoriteRouter = Router();

// Crear favorito
favoriteRouter.post("/create", validateCreateFavorite, createFavoriteController);

// Obtener favoritos de un usuario
favoriteRouter.get("/:idUser", getFavoritesByUserIdController);

// Eliminar favorito
favoriteRouter.delete("/:idUser/:favoriteId", validateDeleteFavorite, deleteFavoriteController);

export { favoriteRouter };
