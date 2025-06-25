import { client } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { compare, encrypt } from "../utils/helpers/handleBcrypt.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { Favorite } from "../models/favorite.model.js"; 
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

        //Crear una entrada de favoritos vacia para este usuario
        const favorites = new Favorite({ idUser: savedUser._id, idRestaurant: []});
        await favorites.save();

        return createUser;

    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

//Generando un token
export const getToken = async (user, password) => {
    try {
        if (await compare(password, user.password)) {
            const { _id, name } = user;
            const token = jwt.sign({
                _id,
                name,
                exp: Date.now() + 60 * 1000
            }, JWT_SECRET);
        
            return token;
        }
        /*
        if(oauth) {
        const { _id, name } = user;
        const token = jwt.sign({
            _id,
            name,
            exp: expires
        }, JWT_SECRET);

        return token;
    } else throw new Error("Las contraseñas no coinciden");
         */
    } catch (error) {
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
        const user = await User.findOne({ email: email }).populate("favorites");

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
        
        const filePath = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            userDeleted.picture
        );
        fs.unlink(filePath, (error) => {
            if(error)
            throw new Error('Hubo un error al querer eliminr la imagen');
        });

        // Eliminar los favoritos relacionados con este usuario
        await Favorite.findOneAndDelete({ idUser: id });

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
        // Verificar si el usuario y el restaurante existen
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");
    
        const restaurant = await Restaurant.findById(idRestaurant);
        if (!restaurant) throw createError(404, "Restaurante no encontrado");
    
    // Verificar si el restaurante ya está en los favoritos
    if (user.favorites.includes(idRestaurant)) {
        throw createError(400, "El restaurante ya está en los favoritos");
        }
    
        // Agregar el restaurante a los favoritos del usuario
        user.favorites.push(idRestaurant);
        await user.save();
    
        return user;
    } catch (error) {
        throw new Error(`Error al agregar el restaurante a favoritos: ${error.message}`);
    }
};

// Eliminar restaurante de los favoritos del usuario
export const removeRestaurantFromFavorites = async (idUser, idRestaurant) => {
    try {
        // Verificar si el usuario y el restaurante existen
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");
    
        const restaurant = await Restaurant.findById(idRestaurant);
        if (!restaurant) throw createError(404, "Restaurante no encontrado");
    
        // Eliminar el restaurante de los favoritos
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== idRestaurant);
        await user.save();
    
        return user; 
    } catch (error) {
        throw new Error(`Error al eliminar el restaurante de favoritos: ${error.message}`);
    }
};