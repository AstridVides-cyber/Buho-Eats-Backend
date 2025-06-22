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

const restaurantRouter = Router();

// Crear restaurante:D
restaurantRouter.post("/create", upload.single('image'),validateCreateRestaurant, createRestaurantController);

// Obtener todos los restaurantes:
restaurantRouter.get("/all", getRestaurantsController);

// Obtener restaurante por ID:D
restaurantRouter.get("/:id", validateGetRestaurantById, getRestaurantByIdController);

// Actualizar restaurante por ID:D
restaurantRouter.put("/:id", validateUpdateRestaurant, updateRestaurantController);

// Eliminar restaurante por ID:D
restaurantRouter.delete("/:id", validateDeleteRestaurant, deleteRestaurantController);

export { restaurantRouter };
