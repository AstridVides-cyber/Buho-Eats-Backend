import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

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
        .withMessage("La descripción es obligatoria"),

    body("price")
        .optional()
        .isObject()
        .withMessage("El precio debe ser un objeto con antes y ahora"),

    body("rules")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Las reglas son obligatorias"),

    (req, res, next) => validateResult(req, res, next),
];

export const validateUpdatePromotion = [
    param("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

    body("title")
        .optional()
        .isString()
        .withMessage("El título de la promoción debe ser una cadena"),

    body("description")
        .optional()
        .isString()
        .withMessage("La descripción de la promoción debe ser una cadena"),

    body("price")
        .optional()
        .isObject()
        .withMessage("El precio debe ser un objeto con antes y ahora"),

    body("rules")
        .optional()
        .isString()
        .withMessage("Las reglas deben ser una cadena"),

    (req, res, next) => validateResult(req, res, next),
];

export const validateDeletePromotion = [
    param("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),
        
    (req, res, next) => validateResult(req, res, next),
];
