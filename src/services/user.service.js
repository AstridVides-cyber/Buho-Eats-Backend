import { client } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { compare, encrypt } from "../utils/helpers/handleBcrypt.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors"; 


const JWT_SECRET = process.env.JWT_SECRET;
const expires = Math.floor(Date.now() / 1000) + (2 * 60 * 60);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crear un nuevo usuario
export const saveUser = async (user, password, picture) => {
    try {
        //Crear un nuevo usuario
        let newUser = User();
        if (password) {
            const hashPassword = await encrypt(password);
            newUser = new User({ ...user, password: hashPassword, picture: picture });
        } else {
            newUser = new User({ ...user, picture: picture });
        }
        const createUser = await newUser.save();

        return createUser;

    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

// Generación de un token
export const getToken = async (user, password) => {
    try {
        if (!await compare(password, user.password)) {
            throw new Error("Contraseña incorrecta");
        }
        const { _id, name } = user;
        const expires = Math.floor(Date.now() / 1000) + (2 * 60 * 60); // Expiración a 2 horas

        const token = jwt.sign({
            _id,
            name,
            exp: expires
        }, JWT_SECRET);

        return token;
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al obtener el token: ${error.message}`);
    }
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const users = await User.find(); 
        return users;
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al obtener los usuarios: ${error.message}`);
    }
};

//Obtener un usuario por email
export const findUserByEmail = async (email, toCreate) => {
    try {
        const user = await User.findOne({ email: email }); // Eliminar populate, ya no es necesario

        if (!user && !toCreate) throw  new Error( "Usuario no encontrado");
    
        return user;
    } catch (error) {
        throw new Error(`Hubo un error al obtener el usuario: ${error.message}`);
    }
};

// Actualizar un usuario por email
export const updateUserByEmail = async (email, data, picture) => {
    try {
        const oldData = await findUserByEmail(email);
    
        if (!oldData) throw new Error(`No se encontro al usuario`);

        if (picture && oldData.picture) {
            const filePath = path.join(
                __dirname,
                "..",
                "..",
                "uploads",
                oldData.picture
            );
        fs.unlink(filePath, (error) => {
            if (error)
                throw new Error(
                `Hubo un error al querer eliminar la imagen: ${error.message}`
                );
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
                ...data,
            },
            {
              new: true, // Devuelve el usuario actualizado
                runValidators: true,
            }
        );
    
        return updatedUser;
    
    } catch (error) {
        console.error(error);
    throw new Error(
        `Hubo un error al actualizar los datos del usuario ${error}`
        );
    }
};

//Eliminar un usuario por id
export const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) throw new Error(`No se encontro al usuario`);

        // Ya no se elimina nada de favoritos porque solo es un arreglo de ids
        return deletedUser;
    } catch (error) {
        console.error(error);
    throw new Error(`Hubo un error al eliminar al usuario ${error.message}`);
    }
};

// Cambiar el rol de un usuario
export const changeUserRole = async (id, role) => {
    try {
        // Validar que el rol esté en los valores permitidos
        const validRoles = ['cliente', 'restAdmin', 'sysAdmin'];
        if (!validRoles.includes(role)) {
            throw createError(400, "Rol no válido");
        }

        const user = await User.findById(id);
        if (!user) throw createError(404, "Usuario no encontrado");

        user.rol = role;
        await user.save();

        return user;
    } catch (error) {
        throw new Error(`Error al cambiar el rol: ${error.message}`);
    }
};

// Agregar restaurante a los favoritos del usuario
export const addRestaurantToFavorites = async (idUser, idRestaurant) => {
    try {
        // Verificar si el usuario existe
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");

        // Verificar si el restaurante ya está en los favoritos
        if (user.favoritos.includes(idRestaurant)) {
            throw createError(400, "El restaurante ya está en los favoritos");
        }

        // Agregar el restaurante a los favoritos del usuario
        user.favoritos.push(idRestaurant);
        await user.save();
        // Recargar el usuario actualizado para asegurar favoritos actualizado
        const refreshedUser = await User.findById(idUser);
        return refreshedUser;
    } catch (error) {
        throw new Error(`Error al agregar el restaurante a favoritos: ${error.message}`);
    }
};

// Eliminar restaurante de los favoritos del usuario
export const removeRestaurantFromFavorites = async (idUser, idRestaurant) => {
    try {
        // Verificar si el usuario existe
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");

        // Eliminar el restaurante de los favoritos
        user.favoritos = user.favoritos.filter(fav => fav !== idRestaurant);
        await user.save();

        return user; 
    } catch (error) {
        throw new Error(`Error al eliminar el restaurante de favoritos: ${error.message}`);
    }
};

// Obtener los favoritos de un usuario (IDs o datos completos)
export const getUserFavorites = async (idUser, fullData = false) => {
    try {
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");
        if (!user.favoritos || user.favoritos.length === 0) return [];

        if (fullData) {
            // Devuelve los datos completos de los restaurantes favoritos
            const restaurants = await Restaurant.find({ _id: { $in: user.favoritos } });
            return restaurants;
        } else {
            // Devuelve solo los IDs
            return user.favoritos;
        }
    } catch (error) {
        throw new Error(`Error al obtener los favoritos: ${error.message}`);
    }
};

// Eliminar un restaurante de los favoritos de un usuario (por IDs)
export const removeFavoriteIfExists = async (userId, restaurantId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;
        if (user.favoritos && user.favoritos.includes(restaurantId)) {
            user.favoritos = user.favoritos.filter(fav => fav !== restaurantId);
            await user.save();
        }
    } catch (error) {
        // No lanzar error, solo loguear
        console.error(`Error al eliminar favorito al bloquear usuario: ${error.message}`);
    }
};