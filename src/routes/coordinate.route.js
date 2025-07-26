import { Router } from "express";
import { 
    createCoordinateController, 
    getCoordinatesController 
} from "../controllers/coordinate.controllers.js";
import { validateCoordinate } from "../validators/coordinate.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const coordinateRouter = Router();

// Route to create a new coordinate
coordinateRouter.post("/create", verifyToken, validateCoordinate, createCoordinateController);

// Route to get all coordinates
coordinateRouter.get("/all", getCoordinatesController);

export { coordinateRouter };
