import { 
    createReview, 
    findAllReviews, 
    findReviewById, 
    deleteReviewById 
} from "../services/review.service.js";
import createError from "http-errors";

// Crear reseña
export const createReviewController = async (req, res, next) => {
    const { comment, stars, idUser, idrestaurant } = req.body;

    try {
        const review = await createReview({ comment, stars, idUser, idrestaurant });
        res.status(201).json({ message: "Reseña creada correctamente", data: review });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las reseñas
export const findAllReviewsController = async (req, res, next) => {
    try {
        const reviews = await findAllReviews();
        if (!reviews) throw createError(404, 'No se encontraron reseñas');
        res.status(200).json({ data: reviews });
    } catch (error) {
        next(error);
    }
};

// Obtener reseña por ID
export const findReviewByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await findReviewById(id);
        if (!review) throw createError(404, 'Reseña no encontrada');
        res.status(200).json({ data: review });
    } catch (error) {
        next(error);
    }
};

// Eliminar reseña
export const deleteReviewController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedReview = await deleteReviewById(id);
        if (!deletedReview) throw createError(404, 'Reseña no encontrada');
        res.status(200).json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};
