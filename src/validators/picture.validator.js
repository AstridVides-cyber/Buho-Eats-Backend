import path from "path";
import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { PICTURE } from "../utils/regex/regex.js";

// Validación para crear una imagen
export const validateCreatePicture = [
    param("idRestaurant")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El idRestaurant debe ser un ID de MongoDB válido"),

    body("url")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La URL de la imagen es obligatoria")
        .matches(PICTURE)
        .withMessage("La URL de la imagen debe tener un formato válido y una extensión jpg, jpeg o png"),

    (req, res, next) => {
        validateResult(req, res, next);  
    }
];

//Validacion para agregar imagenes
export const validateAddPictures = [
    body("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id debe ser un ID de Mongo válido"),

    body("url").custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error("Debe enviar al menos una imagen");
        }
        req.files.forEach((file) => {
            const validExtensions = [".jpg", ".jpeg", ".png"];
            const fileExtension = path.extname(file.originalname);
            if (!validExtensions.includes(fileExtension)) {
                throw new Error(
                    `Solo se permiten imágenes con las extensiones: ${validExtensions.join(", ")}`
                );
            }
        });
        return true;
    }),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

//Validacion para eliminar multiples imagenes
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

//Validacion para eliminar una imagen
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