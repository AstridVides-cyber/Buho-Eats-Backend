import { Router } from "express";
import { 
    createPromotionController, 
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
import { verifyToken } from "../middlewares/jwt.middleware.js";

const promotionRouter = Router();

// Crear promoción para un restaurante :D
promotionRouter.post("/create", verifyToken, validateCreatePromotion, createPromotionController);

// Obtener una promoción por ID :D
promotionRouter.get("/:promotionId", validateGetPromotionById, getPromotionByIdController);

// Actualizar una promoción :D
promotionRouter.put("/:promotionId", verifyToken, validateUpdatePromotion, updatePromotionController);

// Eliminar una promoción :D
promotionRouter.delete("/:promotionId", verifyToken, validateDeletePromotion, deletePromotionController);

export { promotionRouter };
