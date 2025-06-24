import { Router } from "express";
import {
    createPromotionController,
    getPromotionsController,
    updatePromotionController,
    deletePromotionController,
} from "../controllers/promotion.controllers.js";
import { 
    validateCreatePromotion, 
    validateUpdatePromotion, 
    validateDeletePromotion 
} from "../validators/promotion.validator.js";

const promotionRouter = Router();

// Crear promoción para un restaurante 
promotionRouter.post("/:id/promocion/create", createPromotionController);

// Obtener todas las promociones de un restaurante 
promotionRouter.get("/:id/promocion", getPromotionsController);

// Actualizar promoción
promotionRouter.patch("/:idPromo", validateUpdatePromotion, updatePromotionController);

// Eliminar promoción
promotionRouter.delete("/:idPromo", validateDeletePromotion, deletePromotionController);

export { promotionRouter };
