import "dotenv/config";
import { client } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js"; 
import { 
    saveUser,
    getToken,
    getAllUsers, 
    findUserByEmail, 
    updateUserByEmail, 
    deleteUserById, 
    changeUserRole, 
    addRestaurantToFavorites, 
    removeRestaurantFromFavorites,
    getUserFavorites
} from "../services/user.service.js";
import createError from "http-errors";
import { encrypt } from "../utils/helpers/handleBcrypt.js";

// Utilidad para construir la URL completa de la imagen
const getImageUrl = (req, filename) => {
    if (!filename) return null;
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// Crear usuario
export const createUserController = async (req, res, next) => {
    try {
        const picture = req.file ? req.file.filename : null;
        const { password, ...user } = req.body;
        const existUser = await findUserByEmail(user.email, true);

        if (existUser) throw createError(400, "El usuario ya existe");

        const userCreated = await saveUser(user, password, picture);
        userCreated.favoritos = [];

        // Transformar el usuario para el frontend
        const userForFrontend = {
            id: userCreated._id,
            name: userCreated.name,
            lastName: userCreated.lastName,
            email: userCreated.email,
            password: userCreated.password,
            imageProfile: userCreated.picture,
            rol: userCreated.rol,
            favoritos: userCreated.favoritos || []
        };
        res.status(201).json({ message: "Usuario creado", data: userForFrontend });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Obteniendo el token
export const generateTokenController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Buscar al usuario por su email
        const user = await findUserByEmail(email);
        if (!user) {
            throw createError(404, "No se encontró al usuario");
        }
        // Generar el token con la función del servicio
        const token = await getToken(user, password);
        if (!token) {
            throw createError(401, "No se pudo generar el token de acceso");
        }
        // Transformar el usuario para el frontend
        const userForFrontend = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            imageProfile: getImageUrl(req, user.picture),
            rol: user.rol,
            favoritos: user.favoritos || []
        };
        res.status(200).json({
            message: "Token generado exitosamente",
            token: token,
            user: userForFrontend
        });
    } catch (error) {
        next(error);
    }
};


/*
export const googleCallBackController = async (req, res, next) => {
    const { code } = req.query;
    try {
    if (!code)
        throw new Error(`No se ubtuvo un codigo`)
    
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userData = await getUserData(tokens.access_token);

    const existingUser = await findUserByEmail(userData.email, true);
    const jwtToken = await getToken(userData, null, true);

        if (existingUser) {
                res.status(200).json({
                message: "Se inicio sesion correctamente",
                data: userData,
                token: jwtToken,
            });
        } else {
                const data = {
                name: userData.given_name,
                email: userData.email,
                rol: "cliente",
            };
            await saveUser(data, null);
                res.status(200).json({
                message: "Se autentico exitosamente",
                data: userData,
                token: jwtToken,
            });
        }
        } catch (error) {
        next(error);
        }
};*/

// Obtener todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        if (!users) throw createError(404, "No hay usuarios ingresados");
        const usersForFrontend = users.map(user => ({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            imageProfile: user.picture,
            rol: user.rol,
            favoritos: user.favoritos || []
        }));
        res.status(200).json(usersForFrontend);
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

        // Transformar el usuario para el frontend
        const userForFrontend = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            imageProfile: user.picture,
            rol: user.rol,
            favoritos: user.favoritos || []
        };
        res.status(200).json({ message: "Se obtuvieron los datos del usuario", data: userForFrontend });
    } catch (error) {
        next(error);
    }
};

// Obtener email de usuario por ID
export const getUserEmailByIdController = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json({ email: user.email });
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por ID (PATCH)
export const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        if (updateData.imageProfile) {
            updateData.picture = updateData.imageProfile;
            delete updateData.imageProfile;
        }
        if (updateData.password) {
            updateData.password = await encrypt(updateData.password);
        }
        if (req.file) {
            updateData.picture = req.file.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) throw createError(404, "Usuario no encontrado");

        // Transformar para el frontend
        const userForFrontend = {
            id: updatedUser._id,
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedUser.password,
            imageProfile: updatedUser.picture,
            rol: updatedUser.rol,
            favoritos: updatedUser.favoritos || []
        };
        res.status(200).json({ message: "Usuario actualizado", data: userForFrontend });
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

// Obtener favoritos de un usuario (IDs o datos completos)
export const getUserFavoritesController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fullData = req.query.fullData === 'true';
        const favoritos = await getUserFavorites(id, fullData);
        res.status(200).json({
            message: fullData ? "Datos completos de restaurantes favoritos" : "IDs de restaurantes favoritos",
            favoritos
        });
    } catch (error) {
        next(error);
    }
};

