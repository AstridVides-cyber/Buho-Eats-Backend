import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { validateImageString } from "../utils/helpers/image.helper.js";

// Validación para crear un restaurante
export const validateCreateRestaurant = [
    body("name")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El nombre es obligatorio"),

    body("description")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La descripción es obligatoria"),

    body("category")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La categoría es obligatoria"),

    body("image")
        .optional()
        .custom(validateImageString),

    body("email")
        .exists()
        .isEmail()
        .withMessage("El correo es obligatorio y debe ser válido"),

    body("direction")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La dirección es obligatoria"),

    (req, res, next) => { validateResult(req, res, next); }
];

// Validación para actualizar un restaurante
export const validateUpdateRestaurant = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante debe ser un ObjectId válido"),

    body("name")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("El nombre es obligatorio"),

    body("description")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La descripción es obligatoria"),

    body("category")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La categoría es obligatoria"),

    body("image")
        .optional()
        .custom(validateImageString),

    (req, res, next) => { validateResult(req, res, next); }
];

// Validación para obtener un restaurante por ID
export const validateGetRestaurantById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante debe ser un ObjectId válido"),

    (req, res, next) => { validateResult(req, res, next); }
];

// Validación para eliminar un restaurante
export const validateDeleteRestaurant = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante debe ser un ObjectId válido"),

    (req, res, next) => { validateResult(req, res, next); }
];
