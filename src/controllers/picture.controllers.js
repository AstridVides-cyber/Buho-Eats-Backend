import { 
    saveImage, 
    addPictures, 
    removePictures, 
    findAllPictures, 
    findPictureById, 
    deletePictureById 
} from "../services/picture.service.js";
import createError from "http-errors";

// Guardar nueva imagen
export const saveImageController = async (req, res, next) => {
    const { url, idLocal } = req.body; // Extraer los datos del cuerpo de la solicitud

    try {
        const picture = await saveImage(url, idLocal);
        res.status(201).json({ success: true, message: "Imagen creada correctamente", data: picture });
    } catch (error) {
        next(error);
    }
};

// Agregar imágenes a un local
export const addPicturesController = async (req, res, next) => {
    const { picturesToAdd } = req.body; // Extraer las imágenes a agregar
    const { id } = req.params; // Extraer el id del local desde los parámetros de la URL

    try {
        const updatedLocal = await addPictures(picturesToAdd, id);
        res.status(200).json({ success: true, message: "Imágenes agregadas correctamente", data: updatedLocal });
    } catch (error) {
        next(error);
    }
};

// Eliminar imágenes de un local
export const removePicturesController = async (req, res, next) => {
    const { picturesToRemove } = req.body; // Extraer las imágenes a eliminar
    const { id } = req.params; // Extraer el id del local desde los parámetros de la URL

    try {
        const updatedLocal = await removePictures(picturesToRemove, id);
        res.status(200).json({ success: true, message: "Imágenes eliminadas correctamente", data: updatedLocal });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las imágenes
export const findAllPicturesController = async (req, res, next) => {
    try {
        const pictures = await findAllPictures();
        res.status(200).json({ success: true, data: pictures });
    } catch (error) {
        next(error);
    }
};

// Obtener una imagen por su ID
export const findPictureByIdController = async (req, res, next) => {
    const { id } = req.params; // Extraer el id de la imagen desde los parámetros de la URL

    try {
        const picture = await findPictureById(id);
        if (!picture) throw new createError(404, "Imagen no encontrada");
        res.status(200).json({ success: true, data: picture });
    } catch (error) {
        next(error);
    }
};

// Eliminar una imagen por su ID
export const deletePictureByIdController = async (req, res, next) => {
    const { id } = req.params; // Extraer el id de la imagen desde los parámetros de la URL

    try {
        const deletedPicture = await deletePictureById(id);
        if (!deletedPicture) throw new createError(404, "Imagen no encontrada");
        res.status(200).json({ success: true, message: "Imagen eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};
