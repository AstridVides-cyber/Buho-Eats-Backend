import { client } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { compare, encrypt } from "../utils/helpers/handleBcrypt.js";
import jwt from "jsonwebtoken";
import { Favorite } from "../models/favorite.model.js"; 
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors"; 

const JWT_SECRET = process.env.JWT_SECRET;
const expires = Math.floor(Date.now() / 1000) + (48 * 60 * 60);

//Create a new user and save to the database
export const saveUser = async (user, password, picture) => {
    try {
        //Create a new user instance
        let newUser;
        if (password) {
            const hashPassword = await encrypt(password);
            newUser = new User({ 
                ...user, 
                password: hashPassword, 
                picture: picture || null
            });
        } else {
            newUser = new User({ 
                ...user, 
                picture: picture || null
            });
        }
        const savedUser = await newUser.save();

        //Create a new favorite instance for the user
        const favorites = new Favorite({ idUser: savedUser._id, idRestaurant: []});
        await favorites.save();

        return savedUser;

    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

// Find a user by ID
export const getToken = async (user, password) => {
    try {
        if (!await compare(password, user.password)) {
            throw new Error("Contraseña incorrecta");
        }
        const { _id, name } = user;

        // Generate a JWT token
        const token = jwt.sign(
            { 
                _id, 
                name 
            },
            JWT_SECRET,
            { expiresIn: '48h' } 
        );

        return token;
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al obtener el token: ${error.message}`);
    }
};


// Login with Google using ID token
export const loginGoogleByIdToken = async (id_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;

        let user = await findUserByEmail(email, true);
        if (!user) {
            user = await saveUser({ 
                email, 
                given_name, 
                family_name, 
                rol: "cliente" 
            }, null, picture);
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name },
            JWT_SECRET,
            { expiresIn: '48h' }
        );
        return { user, token };
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al iniciar sesión con Google: ${error.message}`);
    }
};


// Get all users from the database
export const getAllUsers = async () => {
    try {
        const users = await User.find(); 
        return users;
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al obtener los usuarios: ${error.message}`);
    }
};


//  Find a user by email
export const findUserByEmail = async (email, toCreate) => {
    try {
        const user = await User.findOne({ email: email }).populate("favorites");

        if (!user && !toCreate) throw  new Error( "Usuario no encontrado");
    
        return user;
    } catch (error) {
        throw new Error(`Hubo un error al obtener el usuario: ${error.message}`);
    }
};

// Update user by ID
export const updateUserById = async (id, data) => {
    try {
        const oldData = await User.findById(id);
        if (!oldData) throw new Error(`No se encontró al usuario`);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...data },
            { new: true, runValidators: true }
        );

        return updatedUser;
    } catch (error) {
        throw new Error(`Error al actualizar usuario por ID: ${error.message}`);
    }
};


//  Delete user by ID
export const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error(`No se encontró al usuario`);

        // Delete the user's favorites
        await Favorite.findOneAndDelete({ idUser: id });

        return deletedUser;
    } catch (error) {
        console.error(error);
        throw new Error(`Hubo un error al eliminar al usuario: ${error.message}`);
    }
};


//  Change user role by ID
export const changeUserRole = async (id, role) => {
    try {
        //  Validate the role
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

//  Add restaurant to user's favorites
export const addRestaurantToFavorites = async (idUser, idRestaurant) => {
    try {
        //  Verify if the user and restaurant exist
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");
    
        const restaurant = await Restaurant.findById(idRestaurant);
        if (!restaurant) throw createError(404, "Restaurante no encontrado");
    
    //  Check if the restaurant is already in favorites
    if (user.favorites.includes(idRestaurant)) {
        throw createError(400, "El restaurante ya está en los favoritos");
        }
    
        //  Add the restaurant to the user's favorites
        user.favorites.push(idRestaurant);
        await user.save();
    
        return user;
    } catch (error) {
        throw new Error(`Error al agregar el restaurante a favoritos: ${error.message}`);
    }
};

//  Remove restaurant from user's favorites
export const removeRestaurantFromFavorites = async (idUser, idRestaurant) => {
    try {
        //  Verify if the user and restaurant exist
        const user = await User.findById(idUser);
        if (!user) throw createError(404, "Usuario no encontrado");
    
        const restaurant = await Restaurant.findById(idRestaurant);
        if (!restaurant) throw createError(404, "Restaurante no encontrado");
    
        // Check if the restaurant is in favorites
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== idRestaurant);
        await user.save();
    
        return user; 
    } catch (error) {
        throw new Error(`Error al eliminar el restaurante de favoritos: ${error.message}`);
    }
};