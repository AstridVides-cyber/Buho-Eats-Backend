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
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const plateRouter = Router();

// Crear un plato
plateRouter.post('/create', verifyToken, upload.single('image'), validateCreatePlate, createPlateController);

// Obtener todos los platos
plateRouter.get('/allPlates', verifyToken, findAllPlatesController);

// Obtener un plato por ID
plateRouter.get('/:id', verifyToken, validateGetPlateById, findPlateByIdController);

// Actualizar un plato
plateRouter.put('/:id', verifyToken, upload.single('image'), validateUpdatePlate, updatePlateController);

// Eliminar un plato
plateRouter.delete('/:id', verifyToken, validateDeletePlate, deletePlateController);

export { plateRouter };
