import "dotenv/config";
import { client } from "../middlewares/auth.middleware.js";
import { Favorite } from "../models/favorite.model.js"; 
import { 
    saveUser,
    getToken,
    loginGoogleByIdToken,
    getAllUsers, 
    findUserByEmail, 
    updateUserById, 
    deleteUserById, 
    changeUserRole, 
    addRestaurantToFavorites, 
    removeRestaurantFromFavorites 
} from "../services/user.service.js";
import createError from "http-errors";


// Create user controller
export const createUserController = async (req, res, next) => {

    try {
        const { password, picture, ...user } = req.body;
        const existUser = await findUserByEmail(user.email, true);

        if (existUser) throw createError(400, "El usuario ya existe");

        const userCreated = await saveUser(user, password, picture);
        
        userCreated.favorites = []; // Initialize favorites array

        // Create an empty favorites entry for this user
        const favorites = new Favorite({ idUser:  userCreated._id, idRestaurant: [] });
        await favorites.save();

        res.status(201).json({ message: "Usuario creado", data: userCreated });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// Login with Google
export const loginWithGoogleController = async (req, res, next) => {
    const { id_token } = req.body;
    try {
        if (!id_token) {
            throw createError(400, "El id_token es requerido");
        }
        const { user, token } = await loginGoogleByIdToken(id_token);

        res.status(200).json({
            message: "Inicio de sesión exitoso con Google",
            user,
            token
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};


// Generate authorization URL
export const getAuthorizeUrlController = async (req, res, next) => {
    try {
        const authorize = await generateUrlAuthorize();

        res.json({ data: authorize });
    } catch (error) {
        next(error);
    }
};


// Getting the token
export const generateTokenController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Search for the user by email
        const user = await findUserByEmail(email);
        
        // If the user does not exist, return an authentication error
        if (!user) {
            throw createError(404, "No se encontró al usuario");
        }

        // Generate the token with the service function
        const token = await getToken(user, password);
        
        // If the token is not generated, return an error 
        if (!token) {
            throw createError(401, "No se pudo generar el token de acceso");
        }

        res.status(200).json({
            message: "Token generado exitosamente",
            token: token,
        });
    } catch (error) {
        next(error);
    }
};


// Callback de Google
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
};


// Get all users
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


// Get user by email
export const getUserByIdController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await findUserByEmail(email);

        if (!user) throw new createError(404, "No se encontro al usuario");

        res.status(200).json({ 
            message: "Se obtuvieron los datos del usuario", 
            data: user 
        });
    } catch (error) {
        next(error);
    }
};


// Update user
export const updateUserController = async (req, res, next) => {
    const { id } = req.params;
    let userData = req.body;

    try {
        console.log(userData);

        const updatedUser = await updateUserById(id, userData);

        if (!updatedUser) throw createError(404, `Usuario no encontrado ${ id }`);

        res.status(200).json({
            message: "Usuario actualizado correctamente", 
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// Delete user
export const deleteUserController = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};


// Change user role
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


// Add restaurant to favorites
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


// Remove restaurant from favorites
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

