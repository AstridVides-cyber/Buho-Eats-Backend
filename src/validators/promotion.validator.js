import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js"; 

// Validación para crear una promoción
export const validateCreatePromotion = [
    body("title")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El título de la promoción es obligatorio y debe ser una cadena de texto"),

    body("description")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La descripción de la promoción es obligatoria y debe ser una cadena de texto"),

    body("price")
        .exists()
        .notEmpty()
        .isObject()
        .withMessage("El precio debe ser un objeto con las propiedades 'antes' y 'ahora'"),

    body("price.antes")
        .exists()
        .isFloat()
        .withMessage("El precio 'antes' debe ser un número válido"),

    body("price.ahora")
        .exists()
        .isFloat()
        .withMessage("El precio 'ahora' debe ser un número válido"),

    body("rules")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Las reglas de la promoción son obligatorias"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para actualizar una promoción
export const validateUpdatePromotion = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

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
        .withMessage("El precio debe ser un objeto con las propiedades 'antes' y 'ahora'"),

    body("price.antes")
        .optional()
        .isFloat()
        .withMessage("El precio 'antes' debe ser un número válido"),

    body("price.ahora")
        .optional()
        .isFloat()
        .withMessage("El precio 'ahora' debe ser un número válido"),

    body("rules")
        .optional()
        .isString()
        .withMessage("Las reglas de la promoción son obligatorias"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener una promoción por ID
export const validateGetPromotionById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar una promoción
export const validateDeletePromotion = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
