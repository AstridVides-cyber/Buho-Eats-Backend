import { validationResult } from "express-validator";

// Helper para validar imágenes (base64 o URL)
export const validateResult = (req, res, next) => {
    try {

        // Lanza un error si hay errores de validación
        validationResult(req).throw();
        
        return next();  
    } catch (error) {

        // Si se lanza un error, responde con los detalles de los errores
        return res.status(400).json({ 
            message: "Errores de validación",
            errors: error.array() 
        });
    }
};
