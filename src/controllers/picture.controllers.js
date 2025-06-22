import { 
    createPicture, 
    findPictureById, 
    findAllPictures, 
    deletePictureById 
} from "../services/picture.service.js";
import createError from "http-errors";

// Crear una nueva imagen
export const createPictureController = async (req, res, next) => {
    const { url, idRestaurant } = req.body;
    try {
        const picture = await createPicture({ url, idRestaurant });
        res.status(201).json({ message: "Imagen creada correctamente", data: picture });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las imágenes
export const getAllPicturesController = async (req, res, next) => {
    try {
        const pictures = await findAllPictures();
        res.status(200).json({ data: pictures });
    } catch (error) {
        next(error);
    }
};

// Obtener una imagen por ID
export const getPictureByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const picture = await findPictureById(id);
        if (!picture) throw createError(404, 'Imagen no encontrada');
        res.status(200).json({ data: picture });
    } catch (error) {
        next(error);
    }
};

// Eliminar una imagen por ID
export const deletePictureByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPicture = await deletePictureById(id);
        if (!deletedPicture) throw createError(404, 'Imagen no encontrada');
        res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};
