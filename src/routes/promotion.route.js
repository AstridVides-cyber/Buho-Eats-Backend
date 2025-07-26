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

// Create a new promotion:D
promotionRouter.post("/create", verifyToken, validateCreatePromotion, createPromotionController);

// Get promotion by ID:D
promotionRouter.get("/:promotionId", validateGetPromotionById, getPromotionByIdController);

// Update promotion:D
promotionRouter.put("/:promotionId", verifyToken, validateUpdatePromotion, updatePromotionController);

// Delete promotion:D   
promotionRouter.delete("/:promotionId", verifyToken, validateDeletePromotion, deletePromotionController);

export { promotionRouter };
