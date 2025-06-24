import { Router } from "express";
import {
    createPromotionController,
    findAllPromotionsController,
    findPromotionByIdController,
    updatePromotionController,
    deletePromotionController,
} from "../controllers/promotion.controllers.js";

const promotionRouter = Router();

// Crear promoción
promotionRouter.post("/create", createPromotionController);

// Obtener todas las promociones
promotionRouter.get("/all", findAllPromotionsController);

// Obtener promoción por ID
promotionRouter.get("/:id", findPromotionByIdController);

// Actualizar promoción
promotionRouter.put("/:id", updatePromotionController);  // Ruta para actualizar promoción

// Eliminar promoción
promotionRouter.delete("/:id", deletePromotionController);

export { promotionRouter };
