import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un bloqueo
export const validateCreateBlock = [
    body("blockerId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueador es obligatorio y debe ser un ObjectId válido"),
    
    body("blockedId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueado es obligatorio y debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para obtener un bloqueo por usuario
export const validateGetBlock = [
    param("blockerId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueador debe ser un ObjectId válido"),

    param("blockedId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueado debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// Validación para eliminar un bloqueo
export const validateDeleteBlock = [
    param("blockerId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueador debe ser un ObjectId válido"),

    param("blockedId")
        .exists()
        .isMongoId()
        .withMessage("El ID del bloqueado debe ser un ObjectId válido"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
