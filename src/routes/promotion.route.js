import { Router } from "express";
import { 
    createPromotionController, 
    getPromotionsController, 
    getPromotionByIdController, 
    updatePromotionController, 
    deletePromotionController 
} from "../controllers/promotion.controllers.js";
import { 
    validateCreatePromotion, 
    validateGetPromotionById, 
    validateUpdatePromotion, 
    validateDeletePromotion 
} from "../validators/promotion.validator.js";

const promotionRouter = Router();

// Crear promoción para un restaurante 
promotionRouter.post("/create", validateCreatePromotion, createPromotionController);

// Obtener todas las promociones de un restaurante 
promotionRouter.get("/all", getPromotionsController);

// Obtener una promoción por ID 
promotionRouter.get("/:promotionId", validateGetPromotionById, getPromotionByIdController);

// Actualizar una promoción 
promotionRouter.put("/:promotionId", validateUpdatePromotion, updatePromotionController);

// Eliminar una promoción 
promotionRouter.delete("/:promotionId", validateDeletePromotion, deletePromotionController);

export { promotionRouter };
