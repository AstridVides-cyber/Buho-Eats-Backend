import "dotenv/config";
import { client } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { Favorite } from "../models/favorite.model.js"; 
import { 
    saveUser,
    getToken,
  //  generateUrlAuthorize,
   // getUserData,
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

/*
export const getAuthorizeUrlController = async (req, res, next) => {
    try {
        const authorize = await generateUrlAuthorize();

        res.json({ data: authorize });
    } catch (error) {
        next(error);
    }
};
*/

// Obteniendo el token
export const generateTokenController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Buscar al usuario por su email
        const user = await findUserByEmail(email);
        
        // Si el usuario no existe, retornar un error de autenticación
        if (!user) {
            throw createError(404, "No se encontró al usuario");
        }

        // Generar el token con la función del servicio
        const token = await getToken(user, password);
        
        // Si no se genera el token, retornar un error
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
    let userData = req.body;

    try {
        if (picture)
            userData = {
                ...userData,
                picture: picture,
            };
            
        console.log(userData);

        const updatedUser = await updateUserByEmail(email, userData, picture);

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

