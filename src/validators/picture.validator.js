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
        .withMessage("El id es obligatorio")
        .bail()
        .isMongoId()
        .withMessage("El id debe ser un ID de Mongo válido"),

        body("url").custom((value, { req }) => {
            const hasFiles = req.files && req.files.length > 0;
        
            const hasUrls = Array.isArray(req.body.url)
                ? req.body.url.some((url) => typeof url === "string" && url.startsWith("http"))
                : typeof req.body.url === "string" && req.body.url.startsWith("http");
        
            if (!hasFiles && !hasUrls) {
                throw new Error("Debe enviar al menos una imagen (archivo o URL)");
            }
        
            if (hasFiles) {
                const validExtensions = [".jpg", ".jpeg", ".png"];
                req.files.forEach((file) => {
                    const ext = path.extname(file.originalname).toLowerCase();
                    if (!validExtensions.includes(ext)) {
                        throw new Error(
                            `Solo se permiten imágenes con extensiones: ${validExtensions.join(", ")}`
                        );
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