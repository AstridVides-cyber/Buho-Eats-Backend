import "dotenv/config";
import { client } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import { Favorite } from "../models/favorite.model.js"; 
import { 
    saveUser,
    getToken,
    getAllUsers, 
    findUserByEmail, 
    updateUserByEmail, 
    deleteUserById, 
    changeUserRole, 
    addRestaurantToFavorites, 
    removeRestaurantFromFavorites 
} from "../services/user.service.js";
import createError from "http-errors";

// Crear usuario
export const createUserController = async (req, res, next) => {

    try {
        const picture = req.file ? req.file.filename : null;
        const { password, ...user } = req.body;
        const existUser = await findUserByEmail(user.email, true);

        if (existUser) throw createError(400, "El usuario ya existe");

        const userCreated = await saveUser(user, password, picture);
        
        userCreated.favorites = []; // Inicializa favoritos como un array vacío

        // Crear una entrada de favoritos vacía para este usuario
        const favorites = new Favorite({ idUser:  userCreated._id, idRestaurant: [] });
        await favorites.save();

        res.status(201).json({ message: "Usuario creado", data: userCreated });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//Obteniendo el token
export const generateTokenController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) throw new createError(404, "No se encontro al usuario");
    
        const token = await getToken(user, password);
    
        if(!token)
            throw new createError(404, 'No se encontro el token de acceso');
        
        res.status(200).json({
        token: token,
    });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        
        if (!users) throw createError(404, "No hay usuarios ingresados");

        res.status(200).json({
            message: "Usuarios obtenidos correctamente",
            data: users,
        });
    } catch (error) {
        console.error(error);
        next(error); 
    }
};

// Obtener usuario por ID
export const getUserByIdController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await findUserByEmail(email);

        if (!user) throw new createError(404, "No se encontro al usuario");

        res.status(200).json({ message: "Se obtuvieron los datos del usuario", data: user });
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por ID
export const updateUserController = async (req, res, next) => {
    const picture = req.file ? req.file.filename : null;
    const { email } = req.params;
    //let userData = req.body;

    try {
        /*if (picture)
            userData = {
                ...userData,
                picture: picture,
            };
            
        console.log(userData);*/

        const updatedUser = await updateUserByEmail(email, /*userData,*/ picture);

        if (!updatedUser) throw createError(404, `Usuario no encontrado ${email}`);

        res.status(200).json({
            message: "Usuario actualizado correctamente", 
        });
    } catch (error) {
        console.error(error);
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

