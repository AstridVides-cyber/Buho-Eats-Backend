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

// Create a new restaurant:D
restaurantRouter.post("/create", verifyToken, validateCreateRestaurant, createRestaurantController);

// Get all restaurants:D
restaurantRouter.get("/all", getRestaurantsController);

// Get restaurant by ID:D
restaurantRouter.get("/:id", validateGetRestaurantById, getRestaurantByIdController);

//  Update restaurant:D
restaurantRouter.put("/:id", verifyToken, validateUpdateRestaurant, updateRestaurantController);

//  Delete restaurant:D
restaurantRouter.delete("/:id", verifyToken, validateDeleteRestaurant, deleteRestaurantController);

export { restaurantRouter };
