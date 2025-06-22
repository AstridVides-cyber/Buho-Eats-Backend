import { User } from "../models/user.model.js";
import { Favorite } from "../models/favorite.model.js"; 
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors"; 

//Crear un nuevo usuario
export const createUser = async (data) => {
    try {
        // Verificar si el correo ya existe
        const existingUser = await userRouter.findone({email: data.email});
        if(existingUser) throw createError(400, "Ya existe un usuario con este correo");

        //Crear un nuevo usuario
        const newUser = new User(data);
        const savedUser = await newUser.save();

        //Crear una entrada de favoritos vacia para este usuario
        const favorites = new Favorite({ idUser: savedUser._id, idRestaurant: []});
        await favorites.save();

        return savedUser;

    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const users = await User.find(); // Esto obtiene todos los usuarios
        return users;
    } catch (error) {
        throw new Error(`Hubo un error al obtener los usuarios: ${error.message}`);
    }
};

//Obtener un usuario por id
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id).populate("favorites");
        if (!user) throw createError(404, "Usuario no encontrado");
    
        return user;
    } catch (error) {
        throw new Error(`Hubo un error al obtener el usuario: ${error.message}`);
    }
};

// Actualizar un usuario por ID
export const updateUserById = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    
        if (!updatedUser) throw createError(404, "Usuario no encontrado");
    
        return updatedUser;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
};

//Eliminar un usuario por id
export const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) throw createError(404, "Usuario no encontrado");
        
        // Eliminar los favoritos relacionados con este usuario
        await Favorite.findOneAndDelete({ idUser: id });

        return deletedUser;
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
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