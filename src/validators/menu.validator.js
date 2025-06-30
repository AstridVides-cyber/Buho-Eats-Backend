import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un menú
export const validateCreateMenu = [
    body('restaurantId')
        .exists()
        .isMongoId()
        .withMessage('El ID del restaurante es obligatorio y debe ser un ObjectId válido'),

    body('plates')
        .exists()
        .isArray()
        .withMessage('Los platos deben ser un arreglo de strings')
        .notEmpty()
        .withMessage('Los platos no pueden estar vacíos'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener un menú por su ID
export const validateMenuId = [
    param("menuId")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El ID del menú es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para actualizar un menú
export const validateUpdateMenu = [
    param("menuId")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El ID del menú es obligatorio y debe ser un ObjectId válido"),

    body("plates")
        .optional()
        .isArray()
        .withMessage("Los platos deben estar en un arreglo")
        .notEmpty()
        .withMessage("El menú debe contener al menos un plato"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para eliminar un menú
export const validateDeleteMenu = [
    param("menuId")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El ID del menú es obligatorio y debe ser un ObjectId válido"),

    param("restaurantId")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El ID del restaurante es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];
