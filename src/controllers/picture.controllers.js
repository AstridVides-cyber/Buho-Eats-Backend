import { findRestaurantById } from "../services/restaurante.service.js";
import {
    addPictures,
    deletePictureById,
    findAllPictures,
    findPictureById,
    removePictures,
    saveImage,
} from "../services/picture.service.js";
import createError from "http-errors";

//Create picture controller
export const createPictureController = async (req, res, next) => {
    const { url } = req.body;
    const { idRestaurant } = req.params;

    try {
        const existRestaurant = await findRestaurantById(idRestaurant);

        if (!existRestaurant) throw createError(404, "No se encontro el Restaurant");

        const picture = await saveImage(url, idRestaurant);

        res
        .status(201)
        .json({ message: "Se creo la imagen para el Restaurant", data: picture });
    } catch (error) {
        next(error);
    }
};


//Add pictures to restaurant
export const addPicturesController = async (req, res, next) => {
    try {
        const { id, url } = req.body;

        const existPicture = await findPictureById(id);
        if (!existPicture)
            throw new createError(404, "No se encontraron las imagenes");

        let picturesToAdd = [];

        if (url && Array.isArray(url)) {
            picturesToAdd.push(...url);
        }

        await addPictures(picturesToAdd, id);

        res.status(200).json({ message: "Se agregaron las imagenes" });
    } catch (error) {
        next(error);
    }
};


//Remover imagen
export const removePicturesController = async (req, res, next) => {
    const { url, id } = req.body;

    try {
        const existPicture = await findPictureById(id);

        if (!existPicture)
        throw new createError(404, "No se encontraron las imagenes");

        const removed = await removePictures(url, id);

        //Filtra las imagenes que se van a eliminar, busca si estan en la base de datos
        const urlsToDelete = existPicture.url.filter((urls) => url.includes(urls));

        //Si urlsToDelete esta vacio significa que no habia ninguno de los elementos que se querian borrar
        if (urlsToDelete.length === 0)
        throw new createError(404, "No se encontraron las imagenes");

    res.status(200).json({ message: "Se eliminaron las imagenes" });
    } catch (error) {
        next(error);
    }
};


//Get all pictures
export const getPicturesController = async (req, res, next) => {
    try {
        const pictures = await findAllPictures();

        if (!pictures)
        throw createError(404, "No se encontraron imagenes del Restaurant");

        res.status(200).json({ data: pictures });
    } catch (error) {
        next(error);
    }
};


//Get picture by ID
export const findPictureByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const picture = await findPictureById(id);

        if (!picture) throw new createError(404, "No se encontraron las imagenes");

        res.status(200).json({ data: picture });
    } catch (error) {
        next(error);
    }
};


// Delete picture by ID
export const deletePictureController = async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedPicture = await deletePictureById(id);

        if (!deletedPicture) throw new createError(404, "No se encontro la imagen");

        res
        .status(200)
        .json({ message: "Se eliminaron las imagenes exitosamente" });
    } catch (error) {
        next(error);
    }
};