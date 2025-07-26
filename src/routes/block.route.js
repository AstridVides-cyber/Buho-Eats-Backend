import { Router } from "express";
import { 
    createBlockController, 
    deleteBlockController 
} from "../controllers/block.controllers.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

// Router for blocking and unblocking users
const blockRouter = Router();

// Block a user
blockRouter.post("/:id/bloquear/:usuarioId", verifyToken, createBlockController);

// Unblock a user
blockRouter.delete("/:restauranteId/desbloquear/:usuarioId", verifyToken, deleteBlockController);

export { blockRouter };
