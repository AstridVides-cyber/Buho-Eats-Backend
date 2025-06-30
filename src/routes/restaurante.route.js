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
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const restaurantRouter = Router();

// Crear restaurante:D
restaurantRouter.post("/create", verifyToken, upload.single('image'),validateCreateRestaurant, createRestaurantController);

// Obtener todos los restaurantes:
restaurantRouter.get("/all", verifyToken, getRestaurantsController);

// Obtener restaurante por ID:D
restaurantRouter.get("/:id", verifyToken, validateGetRestaurantById, getRestaurantByIdController);

// Actualizar restaurante por ID:D
restaurantRouter.put("/:id", verifyToken, validateUpdateRestaurant, updateRestaurantController);

// Eliminar restaurante por ID:D
restaurantRouter.delete("/:id", verifyToken, validateDeleteRestaurant, deleteRestaurantController);

export { restaurantRouter };
