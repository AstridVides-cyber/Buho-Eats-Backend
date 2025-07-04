import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { validateImageArray } from "../utils/helpers/image.helper.js";

//Crea la imagen
export const validateCreatePicture = [
    param("idRestaurant")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El idRestaurant debe ser un ID de Mongo valido"),

    body("url")
        .exists()
        .custom(validateImageArray),

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

    body("url")
        .exists()
        .custom(validateImageArray),

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
        .exists()
        .custom(validateImageArray),

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