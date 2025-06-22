import { body } from 'express-validator';
import { validateResult } from '../utils/helpers/validate.helper.js';

export const validateCoordinate = [
    body("lat")
        .exists()
        .withMessage("La latitud es obligatoria")
        .isFloat({ min: -90, max: 90 })
        .withMessage("La latitud debe estar entre -90 y 90"),  // Validación de latitud

    body("lng")
        .exists()
        .withMessage("La longitud es obligatoria")
        .isFloat({ min: -180, max: 180 })
        .withMessage("La longitud debe estar entre -180 y 180"),  // Validación de longitud

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
