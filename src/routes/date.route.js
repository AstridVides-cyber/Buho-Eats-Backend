import { Router } from "express";
import { 
    createTimeRangeController, 
    findTimeRangeByIdController 
} from "../controllers/date.controllers.js";
import { validateCreateTimeRange } from "../validators/date.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const timeRangeRouter = Router();

// Route to create a new time range
timeRangeRouter.post("/create", verifyToken, validateCreateTimeRange, createTimeRangeController);

// Route to get a time range by ID
timeRangeRouter.get("/:id", findTimeRangeByIdController);

export { timeRangeRouter };
