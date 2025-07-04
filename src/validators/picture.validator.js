import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { PICTURE } from "../utils/regex/regex.js";

//Crea la imagen
export const validateCreatePicture = [
    param("idRestaurant")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El idRestaurant debe ser un ID de Mongo valido"),

    body("url")
        .exists()
        .isArray()
        .withMessage("La URL de la imagen es obligatoria")
        .isURL()
        .withMessage('Debe ser una URL válida'),
        

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

//Agrega la imagen
export const validateAddPictures = [
    body("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id debe ser un ID de Mongo valido"),

    body("url").custom((value, { req }) => {
        const hasFiles = req.files && req.files.length > 0;
        const hasUrls = value && Array.isArray(value) && value.length > 0;

        if (!hasFiles && !hasUrls) {
            throw new Error("Debe enviar al menos una imagen (archivo o URL)");
        }

        if (hasFiles) {
            const validExtensions = [".jpg", ".jpeg", ".png"];
            req.files.forEach((file) => {
                const fileExtension = path.extname(file.originalname);
                if (!validExtensions.includes(fileExtension)) {
                    throw new Error(
                        `Solo se permiten imágenes con las extensiones: ${validExtensions.join(", ")}`
                    );
                }
            });
        }

        if (hasUrls) {
            value.forEach((url) => {
                if (typeof url !== "string" || !url.startsWith("http")) {
                    throw new Error("Cada URL debe ser una cadena válida que empiece con http o https");
                }
            });
        }
        return true;
    }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

//Remueve la imagen
export const validateRemovePictures = [
    body("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("Debe ser un ID de Mongo valido"),

    body("url")
        .isArray()
        .withMessage("Las URLs deben ir en un arreglo")
        .notEmpty()
        .withMessage("Debe enviar al menos una imagen para eliminar"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

//Elimina la imagen
export const validateDeletePicture = [
    body("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("Debe ser un ID de Mongo válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];