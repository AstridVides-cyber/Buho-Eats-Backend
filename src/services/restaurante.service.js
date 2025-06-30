import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors";

// Crear restaurante
export const createRestaurant = async (data) => {
    try {
        const newRestaurant = new Restaurant(data);
        return await newRestaurant.save();
    } catch (error) {
        throw new Error(`Error al crear el restaurante: ${error.message}`);
    }
};

// Obtener restaurante por ID
export const findRestaurantById = async (id) => {
    try {
        const restaurant = await Restaurant.findById(id).populate("idUser");
        if (!restaurant) throw createError(404, "Restaurante no encontrado");
        return restaurant;
    } catch (error) {
        throw new Error(`Error al obtener el restaurante: ${error.message}`);
    }
};

// Obtener todos los restaurantes
export const getRestaurants = async () => {
    try {
        const restaurants = await Restaurant.find();
        return restaurants;
    } catch (error) {
        throw new Error(`Error al obtener los restaurantes: ${error.message}`);
    }
};

// Actualizar restaurante por ID
export const updateRestaurantById = async (id, data) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!updatedRestaurant) throw createError(404, "Restaurante no encontrado");
        return updatedRestaurant;
    } catch (error) {
        throw new Error(`Error al actualizar el restaurante: ${error.message}`);
    }
};

// Eliminar restaurante por ID
export const deleteRestaurantById = async (id) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) throw createError(404, "Restaurante no encontrado");
        return deletedRestaurant;
    } catch (error) {
        throw new Error(`Error al eliminar el restaurante: ${error.message}`);
    }
};
