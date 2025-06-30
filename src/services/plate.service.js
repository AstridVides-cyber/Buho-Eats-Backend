import { Plate } from "../models/plate.model.js";

// Crear un plato
export const createPlate = async (plateData) => {
    try {
        const newPlate = new Plate(plateData);
        const savedPlate = await newPlate.save();
        return savedPlate;
    } catch (error) {
        throw new Error(`Error al crear el plato: ${error.message}`);
    }
};

// Obtener todos los platos
export const findAllPlates = async () => {
    try {
        const plates = await Plate.find().populate('image');  // Populamos la imagen (referencia al modelo Picture)
        return plates;
    } catch (error) {
        throw new Error(`Error al obtener los platos: ${error.message}`);
    }
};

// Obtener un plato por su ID
export const findPlateById = async (id) => {
    try {
        const plate = await Plate.findById(id).populate('image'); // Populamos la imagen
        return plate;
    } catch (error) {
        throw new Error(`Error al obtener el plato por ID: ${error.message}`);
    }
};

// Actualizar un plato
export const updatePlateById = async (id, plateData) => {
    try {
        const updatedPlate = await Plate.findByIdAndUpdate(id, plateData, { new: true });
        return updatedPlate;
    } catch (error) {
        throw new Error(`Error al actualizar el plato: ${error.message}`);
    }
};

// Eliminar un plato
export const deletePlateById = async (id) => {
    try {
        const deletedPlate = await Plate.findByIdAndDelete(id);
        return deletedPlate;
    } catch (error) {
        throw new Error(`Error al eliminar el plato: ${error.message}`);
    }
};
