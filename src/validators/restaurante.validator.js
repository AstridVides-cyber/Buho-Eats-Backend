import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un restaurante (nuevo modelo)
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

    body("contactInfo.email")
        .optional({ nullable: true })
        .custom((value) => {
            if (value === undefined || value === null || value === "") return true;
            // Solo valida formato si hay valor no vacío
            return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
        })
        .withMessage("El correo debe ser válido si se proporciona"),

    body("contactInfo.address")
        .optional()
        .isString()
        .withMessage("La dirección es obligatoria"),

    // Puedes agregar validaciones para phone y hours si lo deseas

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
        .isString().withMessage("El nombre debe ser un string"),

    body("description")
        .optional()
        .isString().withMessage("La descripción debe ser un string"),

    body("category")
        .optional()
        .isString().withMessage("La categoría debe ser un string"),

    body("imageUrl")
        .optional()
        .isString().withMessage("La imagen debe ser una URL válida"),

    body("latitud")
        .optional()
        .isNumeric().withMessage("La latitud debe ser un número"),

    body("longitud")
        .optional()
        .isNumeric().withMessage("La longitud debe ser un número"),

    body("admin")
        .optional()
        .isString().withMessage("El admin debe ser un string"),

    body("blockedUsers")
        .optional()
        .isArray().withMessage("blockedUsers debe ser un array de strings"),

    body("contactInfo")
        .optional()
        .isObject().withMessage("contactInfo debe ser un objeto"),
    // Solo valida el email si se envía contactInfo en el body
    body("contactInfo.email")
        .if(body("contactInfo").exists())
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("El correo es obligatorio en la actualización si se envía contactInfo")
        .bail()
        .isEmail().withMessage("El correo debe ser válido"),
    body("contactInfo.phone")
        .optional()
        .isString().withMessage("El teléfono debe ser un string"),
    body("contactInfo.hours")
        .optional()
        .isString().withMessage("El horario debe ser un string"),
    body("contactInfo.address")
        .optional()
        .isString().withMessage("La dirección debe ser un string"),

    body("ratings")
        .optional()
        .isArray().withMessage("ratings debe ser un array"),
    body("comments")
        .optional()
        .isArray().withMessage("comments debe ser un array"),
    body("menu")
        .optional()
        .isArray().withMessage("menu debe ser un array"),
    body("promos")
        .optional()
        .isArray().withMessage("promos debe ser un array"),

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
