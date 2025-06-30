import { Router } from "express";
import { 
    createTimeRangeController, 
    findTimeRangeByIdController 
} from "../controllers/date.controllers.js";
import { validateCreateTimeRange } from "../validators/date.validator.js";

const timeRangeRouter = Router();

// Ruta para crear un rango de tiempo
timeRangeRouter.post("/create", validateCreateTimeRange, createTimeRangeController);

// Ruta para obtener un rango de tiempo por ID
timeRangeRouter.get("/:id", findTimeRangeByIdController);

export { timeRangeRouter };
