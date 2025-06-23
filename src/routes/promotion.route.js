import { Router } from "express";
import {
    createPromotionController,
    getAllPromotionsController,
    getPromotionsByRestaurantController,
    deletePromotionController
} from "../controllers/promotion.controllers.js";

const promotionRouter = Router();

promotionRouter.post("/create", createPromotionController); // Crear promoción
promotionRouter.get("/all", getAllPromotionsController); // Obtener todas las promociones
promotionRouter.get("/restaurant/:restaurantId", getPromotionsByRestaurantController); // Obtener promociones por restaurante
promotionRouter.delete("/:id", deletePromotionController); // Eliminar una promoción

export { promotionRouter };
