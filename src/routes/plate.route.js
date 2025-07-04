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

// Crear un plato
plateRouter.post('/create', verifyToken, validateCreatePlate, createPlateController);

// Obtener todos los platos
plateRouter.get('/all', findAllPlatesController);

// Obtener un plato por ID
plateRouter.get('/:id', validateGetPlateById, findPlateByIdController);

// Actualizar un plato
plateRouter.put('/:id', verifyToken, validateUpdatePlate, updatePlateController);

// Eliminar un plato
plateRouter.delete('/:id', verifyToken, validateDeletePlate, deletePlateController);

export { plateRouter };
