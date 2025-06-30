import { Router } from "express";
import { 
    createUserController,
    getAllUsersController, 
    getUserByIdController, 
    updateUserController, 
    deleteUserController,
    generateTokenController, 
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
import { upload } from "../middlewares/multer.middleware.js"
import { verifyToken } from "../middlewares/jwt.middleware.js";

const userRouter = Router();

// Ruta de login
userRouter.post('/login', generateTokenController);

// Crear usuario:D
userRouter.post("/create", verifyToken, validateCreateUser,  upload.single('picture'), createUserController);

// Ruta para obtener todos los usuarios:D
userRouter.get("/all", verifyToken, getAllUsersController);

// Obtener usuario por ID:D
userRouter.get("/:id", verifyToken, getUserByIdController);

// Actualizar usuario:D//revisar
userRouter.put("/:id", validateUpdateUser, upload.single('picture'), updateUserController);

// Eliminar usuario:D
userRouter.delete("/:id", verifyToken, deleteUserController);

// Cambiar rol de usuario:D
userRouter.put("/:id/rol", validateChangeRole, changeUserRoleController);

// Agregar restaurante a favoritos:D
userRouter.post("/:idUser/favoritos/add", verifyToken, validateAddRestaurantToFavorites, addRestaurantToFavoritesController);

// Eliminar restaurante de favoritos:D
userRouter.delete("/:idUser/favoritos/remove", verifyToken, validateRemoveRestaurantFromFavorites, removeRestaurantFromFavoritesController);

export { userRouter };
