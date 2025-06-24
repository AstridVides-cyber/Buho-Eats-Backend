import { Picture } from "../models/picture.model.js";

//Guardala imagen
export const saveImage = async (url, idRestaurant) => {
    try {
        const newPicture = new Picture({ url, idRestaurant});
        const picture = await newPicture.save();
        
        return picture;
    } catch (error) {
        throw new Error(`Hubo un error al crear la imagen: ${error.message}`);
    }
};

//Agrega la imagen
export const addPictures = async (picturesToAdd, id) => {
    try {
         // Agregar nuevas imágenes si hay elementos en picturesToAdd
    await Picture.findByIdAndUpdate(id, {
        $push: {
          url: { $each: picturesToAdd }, // Agrega los nuevos ids al campo de referencias
        },
    });
    } catch (error) {
        throw new Error(`Hubo un error al agregar las imagene: ${error.message}`);
    }
};

//Elimina la imagen
export const removePictures = async (picturesToRemove, id) => {
    try {
        // Eliminara imagenes si hay elementos en picturesToRemove
        const removed = await Picture.findByIdAndUpdate(
            id,
            {
                $pull: {
                url: { $in: picturesToRemove }, // Eliminar fotos por url que coincidan en el arreglo
                },
            },
            {
                new: true,
                runValidators: true,
            } 
        );
    
        return removed;
        } catch (error) {
            throw new Error(`Hubo un error al eliminar las imagenes: ${error}`);
        }
};

//Obtener todas las images
export const findAllPictures = async () => {
    try {
        const pictures = await Picture.find();

        return pictures;
    } catch (error) {
        throw new Error(`Hubo un error al buscar las imagenes: ${error.message}`);
    }
};

//Obtener una imagen por id
export const findPictureById = async (id) => {
    try {
        const picture = await Picture.findById(id);

        return picture;
    } catch (error) {
        throw new Error(`Hubo un error al buscar la imagen: ${error.message}`);
    }
};

//Eliminar una imagen por id
export const deletePictureById = async (id) => {
    try {
        const pictureDeleted = await Picture.findByIdAndDelete(id);

        return pictureDeleted;
    } catch (error) {
        throw new Error(`Hubo un error al eliminar la imagen: ${error.message}`);
    }
};