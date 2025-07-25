import { Picture } from "../models/picture.model.js";

// Create a new picture and save to the database
export const saveImage = async (url, idRestaurant) => {
    try {
        const newPicture = new Picture({ url, idRestaurant });
        const picture = await newPicture.save();

        return picture;
    } catch (error) {
        throw new Error(`Hubo un error al crear la imagen: ${error.message}`);
    }
};

// Add pictures to a restaurant
export const addPictures = async (picturesToAdd, id) => {
    try {
        
        await Picture.findByIdAndUpdate(id, {
        $push: {
            url: { $each: picturesToAdd }, 
        },
        });
    } catch (error) {
        throw new Error(`Hubo un error al agregar las imagene: ${error.message}`);
    }
};

// Remove pictures from a restaurant
export const removePictures = async (picturesToRemove, id) => {
    try {
        // Delete pictures by their URLs
        const removed = await Picture.findByIdAndUpdate(
        id,
        {
            $pull: {
            url: { $in: picturesToRemove }, // Remove pictures that match the URLs
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

// Get all pictures
export const findAllPictures = async () => {
    try {
        const pictures = await Picture.find();

        return pictures;
    } catch (error) {
        throw new Error(`Hubo un error al buscar las imagenes: ${error.message}`);
    }
};

// Get a picture by ID  
export const findPictureById = async (id) => {
    try {
        const picture = await Picture.findById(id);

        return picture;
    } catch (error) {
        throw new Error(`Hubo un error al buscar la imagen: ${error.message}`);
    }
};

// Delete a picture by ID
export const deletePictureById = async (id) => {
    try {
        const pictureDeleted = await Picture.findByIdAndDelete(id);

        return pictureDeleted;
    } catch (error) {
        throw new Error(`Hubo un error al eliminar la imagen: ${error.message}`);
    }
};