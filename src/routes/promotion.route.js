import { Router } from "express";
import { 
    createPromotionController, 
    getPromotionByIdController, 
    updatePromotionController, 
    deletePromotionController,
    getPromotionsController,
    getAllPromotionsController // nuevo
} from "../controllers/promotion.controllers.js";
import { 
    validateCreatePromotion, 
    validateGetPromotionById, 
    validateUpdatePromotion, 
    validateDeletePromotion 
} from "../validators/promotion.validator.js";
import { upload } from "../middlewares/multer.middleware.js";

// Cambia a mergeParams: true para heredar restaurantId
const promotionRouter = Router({ mergeParams: true });

// Obtener todas las promociones globales
promotionRouter.get("/all", getAllPromotionsController);

// Crear promoción para un restaurante 
promotionRouter.post("/", upload.single('imageUrl'), validateCreatePromotion, createPromotionController);

// Obtener una promoción por ID 
promotionRouter.get("/:promotionId", validateGetPromotionById, getPromotionByIdController);

// Actualizar una promoción 
promotionRouter.put("/:promotionId", upload.single('imageUrl'), validateUpdatePromotion, updatePromotionController);

// Eliminar una promoción 
promotionRouter.delete("/:promotionId", validateDeletePromotion, deletePromotionController);

// Obtener todas las promociones de un restaurante
promotionRouter.get("/", getPromotionsController);

export { promotionRouter };
