import { Router } from "express";
import { 
    createUserController,
    getAllUsersController, 
    getUserByIdController, 
    updateUserController, 
    deleteUserController,
    changeUserRoleController, 
    addRestaurantToFavoritesController, 
    removeRestaurantFromFavoritesController, 
    loginWithGoogleController
} from "../controllers/user.controllers.js";
import { 
    validateCreateUser, 
    validateUpdateUser, 
    validateChangeRole, 
    validateAddRestaurantToFavorites, 
    validateRemoveRestaurantFromFavorites 
} from "../validators/user.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const userRouter = Router();


// Create a new user:D
userRouter.post("/create",  validateCreateUser, createUserController);

// Get all users:D
userRouter.get("/all", getAllUsersController);

// Get user by ID:D
userRouter.get("/:id", getUserByIdController);

// Update user:D
userRouter.put("/:id", verifyToken, validateUpdateUser, updateUserController);

// Delete user:D
userRouter.delete("/:id", verifyToken, deleteUserController);

// Change user role:D
userRouter.put("/:id/rol", validateChangeRole, changeUserRoleController);

// Add restaurant to favorites:D
userRouter.post("/:idUser/favoritos/add", verifyToken, validateAddRestaurantToFavorites, addRestaurantToFavoritesController);

// Remove restaurant from favorites:D
userRouter.delete("/:idUser/favoritos/remove", verifyToken, validateRemoveRestaurantFromFavorites, removeRestaurantFromFavoritesController);

// Login with Google:D
userRouter.post("/auth/google", loginWithGoogleController)

export { userRouter };
