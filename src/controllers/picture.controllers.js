import { findRestaurantById } from "../services/restaurante.service.js";
import {
    addPictures,
    deletePictureById,
    findAllPictures,
    findPictureById,
    removePictures,
    saveImage,
} from "../services/picture.service.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import createError from "http-errors";
import { fileURLToPath } from "url";

//Para obtener las rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crear la imagen
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

//Agrega imagen
export const addPicturesController = async (req, res, next) => {
    try {
        const { id } = req.body;

        const existPicture = await findPictureById(id);
        if (!existPicture)
            throw new createError(404, "No se encontraron las imagenes");

        let picturesToAdd = [];

        // Archivos subidos (locales)
        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map((file) => file.filename);
            picturesToAdd.push(...fileNames);
        }

        // URLs proporcionadas
        if (req.body.url && Array.isArray(req.body.url)) {
            picturesToAdd.push(...req.body.url);
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

        //Filtra las imagenes que se van a eliminar, busca si estan en la base de datos para asi asegurar de que se eliminaran solo
        //elementos que se encuentren en la base de datos
        const urlsToDelete = existPicture.url.filter((urls) => url.includes(urls));

        //Si urlsToDelete esta vacion significa que no habia ninguno de los elementos que se querian borrar en ella, por lo que tira un error
        if (urlsToDelete.length === 0)
        throw new createError(404, "No se encontraron las imagenes");

        //Recorre con un foreach para ir eliminando cada elemento del arreglo de urlsToDelete
        urlsToDelete.forEach((url) => {
        const filePath = path.join(__dirname, "..", "..", "uploads", url);
        //fs se utiliza para eliminar en la carpeta los archivos que coincidan con los de la url
        fs.unlink(filePath, (error) => {
            if (error) {
            throw new createError(
                500,
                `Error al eliminar la imagen ${url}: ${error.message}`
            );
            }
        });
    });

    res.status(200).json({ message: "Se eliminaron las imagenes" });
    } catch (error) {
        next(error);
    }
};

//Obtener imagenes
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

//Obtener las imagenes
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

//Eliminar imagen
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