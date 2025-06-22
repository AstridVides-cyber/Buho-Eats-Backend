import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un favorito
export const validateCreateFavorite = [
    body("idUser")
        .exists()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ID válido de Mongo"),
    body("idRestaurant")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser un ID válido de Mongo"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener los favoritos de un usuario
export const validateGetFavoritesByUser = [
    param("idUser")
        .exists()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ID válido de Mongo"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar un favorito
export const validateDeleteFavorite = [
    param("idUser")
        .exists()
        .isMongoId()
        .withMessage("El id del usuario es obligatorio y debe ser un ID válido de Mongo"),
    param("idRestaurant")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante es obligatorio y debe ser un ID válido de Mongo"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
