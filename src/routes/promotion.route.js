import { Router } from "express";
import { 
    createPromotionController, 
    getPromotionsController, 
    getPromotionByIdController, 
    updatePromotionController, 
    deletePromotionController 
} from "../controllers/promotion.controllers.js";

const promotionRouter = Router();

// Crear promoción para un restaurante (POST)
promotionRouter.post("/:id/promocion/create", createPromotionController);

// Obtener todas las promociones de un restaurante (GET)
promotionRouter.get("/:id/promocion", getPromotionsController);

// Obtener una promoción por ID (GET)
promotionRouter.get("/:id/promocion/:promotionId", getPromotionByIdController);

// Actualizar una promoción (PATCH)
promotionRouter.patch("/:id/promocion/:promotionId", updatePromotionController);

// Eliminar una promoción (DELETE)
promotionRouter.delete("/:id/promocion/:promotionId", deletePromotionController);

export { promotionRouter };
