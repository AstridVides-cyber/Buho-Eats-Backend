import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";
import { validateImageString } from "../utils/helpers/image.helper.js";

//Validacion al crear la promo
export const validateCreatePromotion = [
    body("title")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El título es obligatorio"),

    body("description")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("La descripción es obligatoria"),

    body("image")
        .optional()
        .custom(validateImageString),

    body("price.before")
        .exists()
        .isNumeric()
        .withMessage("El precio anterior debe ser un número"),

    body("price.now")
        .exists()
        .isNumeric()
        .withMessage("El precio ahora debe ser un número"),

    body("rules")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("Las reglas son obligatorias"),

    body("restaurantId")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser un ObjectId válido"),
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

    body("image")
        .optional()
        .custom(validateImageString),

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
