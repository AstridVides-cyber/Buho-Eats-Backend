import { body, param } from "express-validator";
import { AUTHCODE, PASSWORD, PICTURE } from "../utils/regex/regex.js";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { query } from 'express-validator';

const allowedRoles = ["cliente", "restAdmin", "sysAdmin"];

// Validación para crear un usuario
export const validateCreateUser = [
    body("name")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("El nombre tiene que tener mas de 3 caracteres"),

    body("lastName")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El apellido es obligatorio"),

    body("email")
        .exists()
        .isEmail()
        .isLength({ min: 10 })
        .withMessage("El correo es obligatorio y debe ser un correo válido"),

    body("password")
        .exists()
        .isString()
        .withMessage("La contraseña es obligatoria"),

    
    (req, res, next) => {
    validateResult(req, res, next);
    },
];

// Validación para actualizar un usuario
export const validateUpdateUser = [
    param("id")
        .exists()
        .notEmpty()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ObjectId válido"),

    body("name")
        .optional()
        .isString()
        .withMessage("El nombre debe ser una cadena de caracteres"),

    body("lastName")
        .optional()
        .isString()
        .withMessage("El apellido debe ser una cadena de caracteres"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("El correo debe ser un correo válido"),

    body("password")
        .optional()
        .isString()
        .withMessage("La contraseña debe ser una cadena de caracteres"),

    body("rol")
        .optional()
        .isString()
        .withMessage("El rol debe ser una cadena de caracteres"),
        
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

// Validación para el callback de Google OAuth
export const validateCallback = [
    query("id_token")
        .notEmpty()
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export const validateGetUser = [
    body("email").exists().notEmpty().isEmail().isLength({ min: 10 }),
    (req, res, next) => {
        validateResult(req, res, next);
        },
    ];
    
    export const validateLogin = [
        body("email").exists().notEmpty().isEmail().isLength({ min: 10 }),
        body("password")
            .notEmpty()
            .isString()
            .matches(PASSWORD)
            .withMessage(
            "La contraseña debe ser de minimo 6 caracteres y contener numeros y letras"
        ),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];  
