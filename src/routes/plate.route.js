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

const plateRouter = Router();

// Crear un plato para un restaurante
plateRouter.post('/', upload.single('image'), validateCreatePlate, createPlateController);
// Obtener todos los platos de un restaurante
plateRouter.get('/', findAllPlatesController);
// Obtener un plato por ID
plateRouter.get('/:dishId', validateGetPlateById, findPlateByIdController);
// Actualizar un plato
plateRouter.put('/:dishId', upload.single('image'), validateUpdatePlate, updatePlateController);
// Eliminar un plato
plateRouter.delete('/:dishId', validateDeletePlate, deletePlateController);

export { plateRouter };
