import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    try {
        
        validationResult(req).throw();  

        return next();  
    } catch (error) {
        
        res.status(400).json({ errors: error.array() });
    }
};
