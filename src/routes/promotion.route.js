import { Router } from "express";
import {
    createPromotionController,
    findAllPromotionsController,
    findPromotionByIdController,
    updatePromotionController,
    deletePromotionController
} from "../controllers/promotion.controllers.js";

const promotionRouter = Router();

// Crear una nueva promoción
promotionRouter.post("/create", createPromotionController);

// Obtener todas las promociones
promotionRouter.get("/all", findAllPromotionsController);

// Obtener una promoción por su ID
promotionRouter.get("/:id", findPromotionByIdController);

// Actualizar una promoción
promotionRouter.put("/:id", updatePromotionController);

// Eliminar una promoción
promotionRouter.delete("/:id", deletePromotionController);

export { promotionRouter };
