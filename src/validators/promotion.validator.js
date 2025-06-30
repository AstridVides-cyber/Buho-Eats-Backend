import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear la promoción (nuevo modelo)
export const validateCreatePromotion = [
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

    body("imageUrl")
        .optional()
        .isString()
        .withMessage("La URL de la imagen debe ser un string"),

    body("price")
        .exists()
        .notEmpty()
        .withMessage("El precio es obligatorio"),

    body("promprice")
        .exists()
        .notEmpty()
        .withMessage("El precio promocional es obligatorio"),

    body("reglas")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Las reglas son obligatorias"),

    body("restaurantId")
        .exists()
        .notEmpty()
        .withMessage("El id del restaurante es obligatorio"),
    (req, res, next) => validateResult(req, res, next),
];

//Validacion al obtener una promotion
export const validateGetPromotionById = [
    param("promotionId")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),
    (req, res, next) => validateResult(req, res, next),
];

//Validation al actualizar una promotion
export const validateUpdatePromotion = [
    param("promotionId")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

    body("title")
        .optional()
        .isString()
        .withMessage("El título debe ser una cadena de texto"),

    body("description")
        .optional()
        .isString()
        .withMessage("La descripción debe ser una cadena de texto"),

    body("price.before")
        .optional()
        .isNumeric()
        .withMessage("El precio anterior debe ser un número"),

    body("price.now")
        .optional()
        .isNumeric()
        .withMessage("El precio ahora debe ser un número"),

    body("rules")
        .optional()
        .isString()
        .withMessage("Las reglas deben ser una cadena de texto"),

    (req, res, next) => validateResult(req, res, next),
];

//Validacion al eliminar una promotion
export const validateDeletePromotion = [
    param("promotionId")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción debe ser un ObjectId válido"),

    (req, res, next) => validateResult(req, res, next),
];
