import { Router } from "express";
import { 
    createRestaurantController, 
    getRestaurantByIdController, 
    updateRestaurantController, 
    deleteRestaurantController, 
    getRestaurantsController 
} from "../controllers/restaurante.controllers.js";
import { 
    validateCreateRestaurant, 
    validateUpdateRestaurant, 
    validateDeleteRestaurant, 
    validateGetRestaurantById 
} from "../validators/restaurante.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const restaurantRouter = Router();

// Crear restaurante:D
restaurantRouter.post("/create", verifyToken, validateCreateRestaurant, createRestaurantController);

// Obtener todos los restaurantes:
restaurantRouter.get("/all", getRestaurantsController);

// Obtener restaurante por ID:D
restaurantRouter.get("/:id", validateGetRestaurantById, getRestaurantByIdController);

// Actualizar restaurante por ID:D
restaurantRouter.put("/:id", verifyToken, validateUpdateRestaurant, updateRestaurantController);

// Eliminar restaurante por ID:D
restaurantRouter.delete("/:id", verifyToken, validateDeleteRestaurant, deleteRestaurantController);

export { restaurantRouter };
