import { Router } from "express";
import { 
    createRestaurantController, 
    getRestaurantByIdController, 
    updateRestaurantController, 
    deleteRestaurantController, 
    getRestaurantsController,
    updateRestaurantImageController,
    deleteDishFromRestaurantController,
    getBlockedUsersController,
    blockUserController,
    unblockUserController
} from "../controllers/restaurante.controllers.js";
import { 
    validateCreateRestaurant, 
    validateUpdateRestaurant, 
    validateDeleteRestaurant, 
    validateGetRestaurantById 
} from "../validators/restaurante.validator.js";
import { upload } from "../middlewares/multer.middleware.js";
import { findRestaurantById } from "../services/restaurante.service.js";

const restaurantRouter = Router();

// Crear restaurante:D
restaurantRouter.post("/", upload.single('image'), validateCreateRestaurant, createRestaurantController);

// Obtener todos los restaurantes:
restaurantRouter.get("/", getRestaurantsController);

// Obtener restaurante por ID:D
restaurantRouter.get("/:id", validateGetRestaurantById, getRestaurantByIdController);

// Actualizar restaurante por ID:D
restaurantRouter.put("/:id", validateUpdateRestaurant, updateRestaurantController);

// Eliminar restaurante por ID:D
restaurantRouter.delete("/:id", validateDeleteRestaurant, deleteRestaurantController);

// Actualizar imagen del restaurante
restaurantRouter.put("/:id/image", upload.single('image'), updateRestaurantImageController);

// Eliminar plato del restaurante
restaurantRouter.delete("/:restaurantId/dishes/:dishId", deleteDishFromRestaurantController);

// Obtener usuarios bloqueados de un restaurante
restaurantRouter.get("/:id/blocked-users", getBlockedUsersController);

// Bloquear usuario en un restaurante
restaurantRouter.post("/:id/block-user", async (req, res, next) => {
    try {
        const { userId } = req.body;
        const restaurant = await findRestaurantById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        let updated = false;
        if (!restaurant.blockedUsers.includes(userId)) {
            restaurant.blockedUsers.push(userId);
            updated = true;
        }
        // Eliminar comentarios y ratings del usuario bloqueado
        const beforeComments = restaurant.comments.length;
        const beforeRatings = restaurant.ratings.length;
        restaurant.comments = restaurant.comments.filter(c => c.userId !== userId);
        restaurant.ratings = restaurant.ratings.filter(r => r.userId !== userId);
        if (updated || restaurant.comments.length !== beforeComments || restaurant.ratings.length !== beforeRatings) {
            await restaurant.save();
        }
        // Siempre devolver como array de strings
        const blockedUsers = (restaurant.blockedUsers || []).map(u => u.toString());
        res.status(200).json({ message: "Usuario bloqueado y reseñas eliminadas", blockedUsers });
    } catch (error) {
        next(error);
    }
});

// Desbloquear usuario en un restaurante
restaurantRouter.post("/:id/unblock-user", async (req, res, next) => {
    try {
        const { userId } = req.body;
        const restaurant = await findRestaurantById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        restaurant.blockedUsers = restaurant.blockedUsers.filter(u => u.toString() !== userId);
        await restaurant.save();
        // Siempre devolver como array de strings
        const blockedUsers = (restaurant.blockedUsers || []).map(u => u.toString());
        res.status(200).json({ message: "Usuario desbloqueado", blockedUsers });
    } catch (error) {
        next(error);
    }
});

// Agregar o actualizar comentario/rating de un usuario
restaurantRouter.post("/:id/reviews", async (req, res, next) => {
    try {
        const { userId, comment, rating } = req.body;
        const restaurant = await findRestaurantById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });

        // Agregar comentario si viene
        if (comment) {
            restaurant.comments.push({ userId, comment });
        }
        // Agregar rating solo si el usuario no ha calificado antes
        if (rating && !restaurant.ratings.some(r => r.userId === userId)) {
            restaurant.ratings.push({ userId, rating });
        }
        await restaurant.save();

        // Mapear respuesta para frontend
        const ratings = (restaurant.ratings || []).map(rt => ({
            userId: rt.userId?.toString() || rt.userId,
            rating: rt.rating
        }));
        const comments = (restaurant.comments || []).map(cm => ({
            userId: cm.userId?.toString() || cm.userId,
            comment: cm.comment
        }));
        res.status(200).json({ message: "Reseña agregada", data: {
            ...restaurant.toObject(),
            ratings,
            comments
        }});
    } catch (error) {
        next(error);
    }
});

// Eliminar comentario y rating de un usuario
restaurantRouter.delete("/:id/reviews", async (req, res, next) => {
    try {
        const { userId } = req.body;
        const restaurant = await findRestaurantById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        restaurant.comments = restaurant.comments.filter(c => c.userId !== userId);
        restaurant.ratings = restaurant.ratings.filter(r => r.userId !== userId);
        await restaurant.save();
        // Mapear respuesta para frontend
        const ratings = (restaurant.ratings || []).map(rt => ({
            userId: rt.userId?.toString() || rt.userId,
            rating: rt.rating
        }));
        const comments = (restaurant.comments || []).map(cm => ({
            userId: cm.userId?.toString() || cm.userId,
            comment: cm.comment
        }));
        res.status(200).json({ message: "Reseña eliminada", data: {
            ...restaurant.toObject(),
            ratings,
            comments
        }});
    } catch (error) {
        next(error);
    }
});

export { restaurantRouter };
