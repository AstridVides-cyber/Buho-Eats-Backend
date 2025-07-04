import { Plate } from "../models/plate.model.js"
import fs from "fs";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export const updatePlateById = async (id, data, oldImg) => {
    try {
        const updatedPlate = await Plate.findByIdAndUpdate(id, data);
        
        if(data.image !== oldImg) {
        const filePath = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            oldImg
        );
        fs.unlink(filePath, (error) => {
            if(error)
            throw new Error('Hubo un error al querer eliminr la imagen');
        });
        }
        return updatedPlate;
    } catch (error) {
        throw new Error(`Hubo un error al actualizar el plato: ${error.message}`);
    }
}

export const deletePlateById = async (id, picture) => {
    try {
        
        const deleted = await Plate.findByIdAndDelete(id);
        
        const filePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        picture
        );
        fs.unlink(filePath, (error) => {
        if(error)
            throw new Error('Hubo un error al querer eliminr la imagen');
        });

        return deleted;
    } catch (error) {
        throw new Error(`Hubo un error al eliminar el plato: ${error.message}`);
    }
}