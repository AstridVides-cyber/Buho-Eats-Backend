import { Router } from "express";
import { 
    createReviewController, 
    findAllReviewsController, 
    findReviewByIdController, 
    deleteReviewController 
} from "../controllers/review.controllers.js";
import { 
    validateCreateReview, 
    validateDeleteReview, 
    validateGetReviewById 
} from "../validators/review.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const reviewRouter = Router();

// Create a new review:D
reviewRouter.post('/create', verifyToken, validateCreateReview, createReviewController);

// Get all reviews:D
reviewRouter.get('/all', verifyToken, findAllReviewsController);

// Get review by ID:D
reviewRouter.get('/:id', verifyToken, validateGetReviewById, findReviewByIdController);

// Delete review:D
reviewRouter.delete('/:id', verifyToken, validateDeleteReview, deleteReviewController);

export { reviewRouter };
