import { Picture } from "../models/picture.model.js";

// Crear una imagen para un restaurante
export const createPicture = async (data) => {
    try {
        const newPicture = new Picture(data);
        const savedPicture = await newPicture.save();
        return savedPicture;
    } catch (error) {
        throw new Error(`Error al crear la imagen: ${error.message}`);
    }
};

// Obtener todas las imágenes
export const findAllPictures = async () => {
    try {
        const pictures = await Picture.find();
        return pictures;
    } catch (error) {
        throw new Error(`Error al obtener las imágenes: ${error.message}`);
    }
};

// Obtener una imagen por su ID
export const findPictureById = async (id) => {
    try {
        const picture = await Picture.findById(id);
        return picture;
    } catch (error) {
        throw new Error(`Error al obtener la imagen: ${error.message}`);
    }
};

// Eliminar una imagen por su ID
export const deletePictureById = async (id) => {
    try {
        const deletedPicture = await Picture.findByIdAndDelete(id);
        return deletedPicture;
    } catch (error) {
        throw new Error(`Error al eliminar la imagen: ${error.message}`);
    }
};
