import { User } from "../models/user.model.js";
import { Favorite } from "../models/favorite.model.js"; 
import { 
    //createUser,
    getAllUsers, 
    findUserById, 
    updateUserById, 
    deleteUserById, 
    changeUserRole, 
    addRestaurantToFavorites, 
    removeRestaurantFromFavorites 
} from "../services/user.service.js";
//import createError from "http-errors";

// Crear usuario
export const createUserController = async (req, res, next) => {
    const userData = req.body;

    try {
        // Verificar si el correo ya existe
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Ya existe un usuario con este correo" });
        }

        // Crear un nuevo usuario
        const newUser = new User({
            ...userData,
            favorites: [] // Inicializa favoritos como un array vacío
        });

        // Guardar usuario
        const savedUser = await newUser.save();

        // Crear una entrada de favoritos vacía para este usuario
        const favorites = new Favorite({ idUser: savedUser._id, idRestaurant: [] });
        await favorites.save();

        res.status(201).json({
            message: "Usuario creado correctamente",
            data: {
                id: savedUser._id,
            }
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Obtener todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers(); 
        res.status(200).json({
            message: "Usuarios obtenidos correctamente",
            data: users,
        });
    } catch (error) {
        next(error); 
    }
};

// Obtener usuario por ID
export const getUserByIdController = async (req, res, next) => {
    try {
        const user = await findUserById(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por ID
export const updateUserController = async (req, res, next) => {
    try {
        const updatedUser = await updateUserById(req.params.id, req.body);

        res.status(200).json({
            message: "Usuario actualizado correctamente", data: updatedUser 
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar usuario
export const deleteUserController = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

// Cambiar rol del usuario
export const changeUserRoleController = async (req, res, next) => {
    try {
        const updatedUser = await changeUserRole(req.params.id, req.body.rol);
        res.status(200).json({ 
            message: "Rol actualizado correctamente", 
            data: updatedUser 
        });
    } catch (error) {
        next(error);
    }
};

// Agregar restaurante a favoritos
export const addRestaurantToFavoritesController = async (req, res, next) => {
    try {
        const updatedUser = await addRestaurantToFavorites(req.params.idUser, req.body.idRestaurant);
        res.status(200).json({
            message: "Restaurante agregado a favoritos",
            data: updatedUser 
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar restaurante de favoritos
export const removeRestaurantFromFavoritesController = async (req, res, next) => {
    try {
        const updatedUser = await removeRestaurantFromFavorites(req.params.idUser, req.body.idRestaurant);
        res.status(200).json({
            message: "Restaurante eliminado de favoritos", 
            data: updatedUser 
        });
    } catch (error) {
        next(error);
    }
};

