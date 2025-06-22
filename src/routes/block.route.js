import { Router } from "express";
import { 
    createBlockController, 
    deleteBlockController 
} from "../controllers/block.controllers.js";

// Aquí definimos las rutas
const blockRouter = Router();

// Bloquear un usuario
blockRouter.post("/:id/bloquear/:usuarioId", createBlockController);

// Desbloquear un usuario
blockRouter.delete("/:restauranteId/desbloquear/:usuarioId", deleteBlockController);

export { blockRouter };
