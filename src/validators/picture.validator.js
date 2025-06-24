import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js"; 

// Validación para crear una imagen
export const validateCreateImage = [
    body("url")
        .exists()
        .notEmpty()
        .withMessage("La URL de la imagen es obligatoria")
        .isURL()
        .withMessage("La URL proporcionada no es válida"),
    body("idRestaurant")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id del Restaurant debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para agregar imágenes a un Restaurant
export const validateAddImages = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del Restaurant debe ser un ObjectId válido"),
    body("picturesToAdd")
        .isArray()
        .withMessage("Las imágenes deben ser un arreglo")
        .custom(value => {
            if (value.some(item => typeof item !== "string" || !item.startsWith("http"))) {
                throw new Error("Cada imagen debe ser una URL válida");
            }
            return true;
        }),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar imágenes de un Restaurant
export const validateRemoveImages = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del Restaurant debe ser un ObjectId válido"),
    body("picturesToRemove")
        .isArray()
        .withMessage("Las imágenes deben ser un arreglo")
        .custom(value => {
            if (value.some(item => typeof item !== "string" || !item.startsWith("http"))) {
                throw new Error("Cada imagen debe ser una URL válida");
            }
            return true;
        }),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener una imagen por id
export const validateGetImageById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la imagen debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar una imagen
export const validateDeleteImage = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la imagen debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
