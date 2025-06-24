import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear una promoción
export const validateCreatePromotion = [
    body("title")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El título de la promoción es obligatorio"),

    body("description")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La descripción de la promoción es obligatoria"),

    body("price")
        .exists()
        .notEmpty()
        .isObject()
        .withMessage("El precio debe ser un objeto con los campos 'before' y 'now'"),

    body("price.before")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("El precio original (before) debe ser un número"),

    body("price.now")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("El precio con descuento (now) debe ser un número"),

    body("rules")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Las reglas de la promoción son obligatorias"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener una promoción por ID
export const validateGetPromotionById = [
    param('id')
        .exists()
        .isMongoId()
        .withMessage('Debe ser un id válido de Mongo'),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para actualizar una promoción
export const validateUpdatePromotion = [
    param('id')
        .exists()
        .isMongoId()
        .withMessage('Debe ser un id válido de Mongo'),

    body("title")
        .optional()
        .isString()
        .withMessage("El título de la promoción debe ser una cadena de texto"),

    body("description")
        .optional()
        .isString()
        .withMessage("La descripción de la promoción debe ser una cadena de texto"),

    body("price")
        .optional()
        .isObject()
        .withMessage("El precio debe ser un objeto con los campos 'before' y 'now'"),

    body("price.before")
        .optional()
        .isNumeric()
        .withMessage("El precio original (before) debe ser un número"),

    body("price.now")
        .optional()
        .isNumeric()
        .withMessage("El precio con descuento (now) debe ser un número"),

    body("rules")
        .optional()
        .isString()
        .withMessage("Las reglas de la promoción son obligatorias"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar una promoción
export const validateDeletePromotion = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El ID debe ser un ObjectId válido"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
