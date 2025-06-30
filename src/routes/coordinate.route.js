import { Router } from "express";
import { 
    createCoordinateController, 
    getCoordinatesController 
} from "../controllers/coordinate.controllers.js";
import { validateCoordinate } from "../validators/coordinate.validator.js";

const coordinateRouter = Router();

// Ruta para crear nuevas coordenadas
coordinateRouter.post("/create", validateCoordinate, createCoordinateController);

// Ruta para obtener todas las coordenadas
coordinateRouter.get("/all", getCoordinatesController);

export { coordinateRouter };
