import { Router } from "express";
import { 
    createUserController,
    getAllUsersController, 
    getUserByIdController, 
    getUserEmailByIdController,
    updateUserController, 
    deleteUserController,
    generateTokenController, 
    changeUserRoleController,
    getUserFavoritesController // <-- nuevo
} from "../controllers/user.controllers.js";
import { 
    validateCreateUser, 
    validateUpdateUser, 
    validateChangeRole
} from "../validators/user.validator.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addRestaurantToFavorites, removeRestaurantFromFavorites } from "../services/user.service.js";

const userRouter = Router();

// Crear usuario:D
userRouter.post("/", validateCreateUser,  upload.single('picture'), createUserController);

// Ruta para login y obtención de token
userRouter.post('/login', generateTokenController);

// Ruta para obtener todos los usuarios:D
userRouter.get("/", getAllUsersController);

// Obtener usuario por ID:D
userRouter.get("/:id", getUserByIdController);

// Obtener email de usuario por ID
userRouter.get("/:id/email", getUserEmailByIdController);

// Actualizar usuario:D//revisar
userRouter.put("/:id", validateUpdateUser, upload.single('picture'), updateUserController);

// Eliminar usuario:D
userRouter.delete("/:id", deleteUserController);

// Cambiar rol de usuario:D
userRouter.put("/:id/rol", validateChangeRole, changeUserRoleController);

// Agregar restaurante a favoritos
userRouter.post('/:idUser/favorites', async (req, res, next) => {
    try {
        const { idRestaurant } = req.body;
        const updatedUser = await addRestaurantToFavorites(req.params.idUser, idRestaurant);
        res.status(200).json({
            message: "Restaurante agregado a favoritos",
            favoritos: updatedUser.favoritos || []
        });
    } catch (error) {
        next(error);
    }
});

// Eliminar restaurante de favoritos (ahora solo por parámetro en la URL)
userRouter.delete('/:idUser/favorites/:idRestaurant', async (req, res, next) => {
    try {
        const updatedUser = await removeRestaurantFromFavorites(req.params.idUser, req.params.idRestaurant);
        res.status(200).json({
            message: "Restaurante eliminado de favoritos",
            favoritos: updatedUser.favoritos || []
        });
    } catch (error) {
        next(error);
    }
});

// Obtener favoritos de un usuario (IDs o datos completos)
userRouter.get('/:id/favorites', getUserFavoritesController);

export { userRouter };
