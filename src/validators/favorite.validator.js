import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para agregar restaurante a favoritos
export const validateAddRestaurantToFavorites = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del usuario debe ser un ObjectId válido"),

    body("idRestaurant")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para eliminar restaurante de favoritos
export const validateRemoveRestaurantFromFavorites = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("El id del usuario debe ser un ObjectId válido"),

    param("restaurantId")
        .exists()
        .isMongoId()
        .withMessage("El id del restaurante debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];
