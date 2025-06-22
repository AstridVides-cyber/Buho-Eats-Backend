import { Router } from "express";
import { 
    createUserController,
    getAllUsersController, 
    getUserByIdController, 
    updateUserController, 
    deleteUserController, 
    changeUserRoleController, 
    addRestaurantToFavoritesController, 
    removeRestaurantFromFavoritesController 
} from "../controllers/user.controllers.js";
import { 
    validateCreateUser, 
    validateUpdateUser, 
    validateChangeRole, 
    validateAddRestaurantToFavorites, 
    validateRemoveRestaurantFromFavorites 
} from "../validators/user.validator.js";
//import { verifyToken } from "../middlewares/jwt.middleware.js";

const userRouter = Router();

// Crear usuario:D
userRouter.post("/create", validateCreateUser, createUserController);

// Ruta para obtener todos los usuarios:D
userRouter.get("/all", getAllUsersController);

// Obtener usuario por ID:D
userRouter.get("/:id", getUserByIdController);

// Actualizar usuario:D//revisar
userRouter.put("/:id", validateUpdateUser, updateUserController);

// Eliminar usuario:D
userRouter.delete("/:id", deleteUserController);

// Cambiar rol de usuario:D
userRouter.put("/:id/rol", validateChangeRole, changeUserRoleController);

// Agregar restaurante a favoritos:D
userRouter.post("/:idUser/favoritos/add", validateAddRestaurantToFavorites, addRestaurantToFavoritesController);

// Eliminar restaurante de favoritos:D
userRouter.delete("/:idUser/favoritos/remove", validateRemoveRestaurantFromFavorites, removeRestaurantFromFavoritesController);

export { userRouter };
