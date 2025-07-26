import { Router } from "express";
import { 
    createPlateController, 
    findAllPlatesController, 
    findPlateByIdController, 
    updatePlateController, 
    deletePlateController 
} from "../controllers/plate.controllers.js";
import { 
    validateCreatePlate, 
    validateUpdatePlate, 
    validateGetPlateById, 
    validateDeletePlate 
} from "../validators/plate.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const plateRouter = Router();

// Create a new plate:D
plateRouter.post('/create', verifyToken, validateCreatePlate, createPlateController);

// Get all plates:D
plateRouter.get('/all', findAllPlatesController);

// Get plate by ID:D
plateRouter.get('/:id', validateGetPlateById, findPlateByIdController);

// Update plate:D
plateRouter.put('/:id', verifyToken, validateUpdatePlate, updatePlateController);

// Delete plate:D
plateRouter.delete('/:id', verifyToken, validateDeletePlate, deletePlateController);

export { plateRouter };
