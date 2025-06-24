import { Router } from "express";
import {
    createPromotionController,
    updatePromotionController,
    deletePromotionController,
} from "../controllers/promotion.controllers.js";
import { 
    validateCreatePromotion, 
    validateUpdatePromotion, 
    validateDeletePromotion 
} from "../validators/promotion.validator.js";

const promotionRouter = Router();

// Crear promoción
promotionRouter.post("/create", validateCreatePromotion, createPromotionController);

// Actualizar promoción
promotionRouter.patch("/:idPromo", validateUpdatePromotion, updatePromotionController);

// Eliminar promoción
promotionRouter.delete("/:idPromo", validateDeletePromotion, deletePromotionController);

export { promotionRouter };
