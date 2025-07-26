import { Review } from "../models/review.model.js";

// Create a new review
export const createReview = async (data) => {
    const newReview = new Review(data);

    try {
        const savedReview = await newReview.save();
        return savedReview;
    } catch (error) {
        throw new Error(`Error al crear la reseña: ${error.message}`);
    }
};

// Find all reviews for a restaurant
export const findAllReviews = async () => {
    try {
        const reviews = await Review.find();
        return reviews;
    } catch (error) {
        throw new Error(`Error al obtener las reseñas: ${error.message}`);
    }
};

// Get a review by ID
export const findReviewById = async (id) => {
    try {
        const review = await Review.findById(id);
        return review;
    } catch (error) {
        throw new Error(`Error al obtener la reseña por ID: ${error.message}`);
    }
};

// Delete a review by ID
export const deleteReviewById = async (id) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        return deletedReview;
    } catch (error) {
        throw new Error(`Error al eliminar la reseña: ${error.message}`);
    }
};
