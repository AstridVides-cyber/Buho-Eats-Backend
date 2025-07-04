import { Router } from "express";
import { 
    createTimeRangeController, 
    findTimeRangeByIdController 
} from "../controllers/date.controllers.js";
import { validateCreateTimeRange } from "../validators/date.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const timeRangeRouter = Router();

// Ruta para crear un rango de tiempo
timeRangeRouter.post("/create", verifyToken, validateCreateTimeRange, createTimeRangeController);

// Ruta para obtener un rango de tiempo por ID
timeRangeRouter.get("/:id", findTimeRangeByIdController);

export { timeRangeRouter };
