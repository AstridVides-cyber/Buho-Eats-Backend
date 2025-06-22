import { 
    createRestaurant, 
    findRestaurantById, 
    getRestaurants, 
    updateRestaurantById, 
    deleteRestaurantById 
} from "../services/restaurante.service.js";
//import { Picture } from "../models/picture.model.js"; 
//import createError from "http-errors";

// Crear restaurante
export const createRestaurantController = async (req, res, next) => {
    try {
        const restaurantData = req.body;
        const newRestaurant = await createRestaurant(restaurantData);
        res.status(201).json({ message: "Restaurante creado correctamente", data: newRestaurant });
    } catch (error) {
        next(error);
    }
};

// Obtener restaurante por ID
export const getRestaurantByIdController = async (req, res, next) => {
    try {
        const restaurant = await findRestaurantById(req.params.id);
        res.status(200).json({ message: "Restaurante encontrado", data: restaurant });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los restaurantes
export const getRestaurantsController = async (req, res, next) => {
    try {
        const restaurants = await getRestaurants();
        res.status(200).json({ message: "Restaurantes encontrados", data: restaurants });
    } catch (error) {
        next(error);
    }
};

// Actualizar restaurante por ID
export const updateRestaurantController = async (req, res, next) => {
    try {
        const updatedRestaurant = await updateRestaurantById(req.params.id, req.body);
        res.status(200).json({ message: "Restaurante actualizado correctamente", data: updatedRestaurant });
    } catch (error) {
        next(error);
    }
};

// Eliminar restaurante por ID
export const deleteRestaurantController = async (req, res, next) => {
    try {
        await deleteRestaurantById(req.params.id);
        res.status(200).json({ message: "Restaurante eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};


