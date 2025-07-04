import { Plate } from "../models/plate.model.js"

export const createPlate = async (data) => {
    const newPlate = new Plate(data);

    try {
        const plates = await newPlate.save();

        return plates;
    } catch (error) {
        throw new Error(`Hubo un error al crear los platos: ${error.message}`);
    }
}

export const findPlateById = async (id) => {
    try {
        const plate = await Plate.findById(id);

        return plate;
    } catch (error) {
        throw new Error(`Hubo un error al buscar el plato: ${error.message}`);
    }
    }

    export const findAllPlates = async () => {
    try {
        const plates = await Plate.find();

        return plates;
    } catch (error) {
        throw new Error(`Hubo un error al buscar los platos: ${error.message}`);
    }
}

export const updatePlateById = async (id, data) => {
    try {
        const updatedPlate = await Plate.findByIdAndUpdate(id, data, { new: true });
        
        return updatedPlate;
    } catch (error) {
        throw new Error(`Hubo un error al actualizar el plato: ${error.message}`);
    }
}

export const deletePlateById = async (id) => {
    try {
        const deleted = await Plate.findByIdAndDelete(id);
        
        return deleted;
    } catch (error) {
        throw new Error(`Hubo un error al eliminar el plato: ${error.message}`);
    }
}