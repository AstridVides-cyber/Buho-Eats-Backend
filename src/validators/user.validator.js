import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un usuario
export const validateCreateUser = [
    body("name")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El nombre es obligatorio"),

    body("lastName")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El apellido es obligatorio"),

    body("email")
        .exists()
        .isEmail()
        .withMessage("El correo es obligatorio y debe ser un correo válido"),

    body("password")
        .exists()
        .isString()
        .withMessage("La contraseña es obligatoria"),

    
    (req, res, next) => {
    validateResult(req, res, next);
    },
];

// Validación para actualizar un usuario (PATCH, todos los campos opcionales)
export const validateUpdateUser = [
    param("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ObjectId válido"),

    body("name")
        .optional()
        .isString()
        .withMessage("El nombre debe ser un string"),

    body("lastName")
        .optional()
        .isString()
        .withMessage("El apellido debe ser un string"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("El correo debe ser un correo válido"),

    body("password")
        .optional()
        .isString()
        .withMessage("La contraseña debe ser un string"),

    body("imageProfile")
        .optional()
        .isString()
        .withMessage("La imagen debe ser un string"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para cambiar el rol de un usuario
export const validateChangeRole = [
    param("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ObjectId válido"),

    body("rol")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El rol es obligatorio"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para agregar un restaurante a favoritos
export const validateAddRestaurantToFavorites = [
    body("idRestaurant")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
    validateResult(req, res, next);
    },
];

// Validación para eliminar un restaurante de favoritos
export const validateRemoveRestaurantFromFavorites = [
    body("idRestaurant")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];
