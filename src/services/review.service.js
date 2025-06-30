import { Review } from "../models/review.model.js";

// Crear una nueva reseña:D
export const createReview = async (data) => {
    const newReview = new Review(data);

    try {
        const savedReview = await newReview.save();
        return savedReview;
    } catch (error) {
        throw new Error(`Error al crear la reseña: ${error.message}`);
    }
};

// Obtener todas las reseñas
export const findAllReviews = async () => {
    try {
        const reviews = await Review.find();
        return reviews;
    } catch (error) {
        throw new Error(`Error al obtener las reseñas: ${error.message}`);
    }
};

// Obtener una reseña por su ID
export const findReviewById = async (id) => {
    try {
        const review = await Review.findById(id);
        return review;
    } catch (error) {
        throw new Error(`Error al obtener la reseña por ID: ${error.message}`);
    }
};

// Eliminar una reseña por su ID
export const deleteReviewById = async (id) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        return deletedReview;
    } catch (error) {
        throw new Error(`Error al eliminar la reseña: ${error.message}`);
    }
};
