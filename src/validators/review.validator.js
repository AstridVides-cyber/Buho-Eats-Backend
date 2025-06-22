import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear una reseña
export const validateCreateReview = [
    body("comment")
        .exists()
        .notEmpty()
        .isString()
        .withMessage("El comentario es obligatorio"),

    body("stars")
        .exists()
        .isInt({ min: 1, max: 5 })
        .withMessage("Las estrellas deben ser un número entre 1 y 5"),

    body("idUser")
        .exists()
        .isMongoId()
        .withMessage("El ID del usuario es obligatorio y debe ser un ObjectId válido"),

    body("idrestaurant")
        .exists()
        .isMongoId()
        .withMessage("El ID del restaurante es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener una reseña por ID
export const validateGetReviewById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un ID válido de MongoDB"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar una reseña por ID
export const validateDeleteReview = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un ID válido de MongoDB"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
