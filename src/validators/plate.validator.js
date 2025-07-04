import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { validateImageString } from "../utils/helpers/image.helper.js";

// Validación para crear un plato
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
        .withMessage(
        "La descripcion del plato es obligatoria"
        ),

    body("category")
        .exists()
        .notEmpty()
        .isString()
        .withMessage(
        "La categoria del plato es obligatoria"
        ),

    body("price")
        .exists()
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser un numero"),

        body("image")
        .optional()
        .custom(validateImageString),
    

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para actualizar un plato
export const validateUpdatePlate = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un id valido de Mongo"),

    body("name")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("El nombre del plato debe ser una cadena de texto"),

    body("description")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La descripcion del plato debe ser una cadena de texto"),

    body("category")
        .optional()
        .notEmpty()
        .isString()
        .withMessage("La categoria del plato debe ser una cadena de texto"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("El precio debe ser un numero"),

    body("image")
        .optional()
        .custom(validateImageString),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para obtener un plato por ID
export const validateGetPlateById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un id valido de Mongo"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para eliminar un plato
export const validateDeletePlate = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un id valido de Mongo"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];