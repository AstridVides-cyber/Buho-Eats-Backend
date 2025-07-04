import { Router } from "express";
import { 
    createBlockController, 
    deleteBlockController 
} from "../controllers/block.controllers.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

// Aquí definimos las rutas
const blockRouter = Router();

// Bloquear un usuario
blockRouter.post("/:id/bloquear/:usuarioId", verifyToken, createBlockController);

// Desbloquear un usuario
blockRouter.delete("/:restauranteId/desbloquear/:usuarioId", verifyToken, deleteBlockController);

export { blockRouter };
