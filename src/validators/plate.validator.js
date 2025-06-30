import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

export const validateCreatePlate = [
    body("name")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El nombre del plato es obligatorio"),

    body("description")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La descripción del plato es obligatoria"),

    body("category")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La categoría del plato es obligatoria"),

    body("price")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser un número"),

    body("image")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La imagen es obligatoria"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdatePlate = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El ID del plato debe ser un ObjectId válido"),

    body("name")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),

    body("description")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La descripción debe ser una cadena de texto"),

    body("category")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La categoría debe ser una cadena de texto"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("El precio debe ser un número"),

    body("image")
        .optional()
        .isString()
        .withMessage("La imagen debe ser una URL válida"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateGetPlateById = [
    param('id')
        .exists()
        .isMongoId()
        .withMessage('Debe ser un id valido de Mongo'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    },
]

export const validateDeletePlate = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El ID debe ser un ObjectId válido"),
        
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
