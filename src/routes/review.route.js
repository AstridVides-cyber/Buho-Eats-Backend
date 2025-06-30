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

const reviewRouter = Router();

// Crear una reseña
reviewRouter.post('/create', validateCreateReview, createReviewController);

// Obtener todas las reseñas
reviewRouter.get('/all', findAllReviewsController);

// Obtener una reseña por ID
reviewRouter.get('/:id', validateGetReviewById, findReviewByIdController);

// Eliminar una reseña por ID
reviewRouter.delete('/:id', validateDeleteReview, deleteReviewController);

export { reviewRouter };
