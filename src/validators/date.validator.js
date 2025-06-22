import { body, param } from "express-validator";
import { validateResult } from "../utils/helpers/validate.helper.js";

// Validación para crear un rango de tiempo
export const validateCreateTimeRange = [
    body("from")
        .exists()
        .notEmpty()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("El formato de hora de apertura es inválido"),

    body("to")
        .exists()
        .notEmpty()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("El formato de hora de cierre es inválido"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

// Validación para obtener un rango de tiempo por ID
export const validateGetTimeRangeById = [
    param("id")
        .exists()
        .isMongoId()
        .withMessage("Debe ser un ID válido de Mongo"),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];
