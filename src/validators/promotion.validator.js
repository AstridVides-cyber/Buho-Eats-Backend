import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

export const validateCreatePromotion = [
    body("title")
        .exists()
        .notEmpty()
        .withMessage("El título es obligatorio"),

    body("description")
        .exists()
        .notEmpty()
        .withMessage("La descripción es obligatoria"),

    body("price")
        .exists()
        .isObject()
        .withMessage("El precio debe ser un objeto con las propiedades 'before' y 'after'"),

    body("price.before")
        .isNumeric()
        .withMessage("El precio anterior debe ser un número"),

    body("price.after")
        .isNumeric()
        .withMessage("El precio actual debe ser un número"),

    body("rules")
        .exists()
        .notEmpty()
        .withMessage("Las reglas son obligatorias"),

    body("restaurantId")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateDeletePromotion = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id de la promoción es obligatorio y debe ser válido"),
        
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
