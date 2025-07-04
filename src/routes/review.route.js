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

// Crear una reseña:D
reviewRouter.post('/create', verifyToken, validateCreateReview, createReviewController);

// Obtener todas las reseñas:D
reviewRouter.get('/all', verifyToken, findAllReviewsController);

// Obtener una reseña por ID :D
reviewRouter.get('/:id', verifyToken, validateGetReviewById, findReviewByIdController);

// Eliminar una reseña por ID :D
reviewRouter.delete('/:id', verifyToken, validateDeleteReview, deleteReviewController);

export { reviewRouter };
