import { Router } from "express";
import {
    createMenuController,
    getAllMenusController,
    getMenuByIdController,
    updateMenuController,
    deleteMenuController,
} from "../controllers/menu.controllers.js";
import { validateMenuId } from "../validators/menu.validator.js"; 
import { verifyToken } from "../middlewares/jwt.middleware.js";

const menuRouter = Router();

// Crear un menú para un restaurante
menuRouter.post("/create", verifyToken, createMenuController);

// Obtener todos los menús
menuRouter.get("/all", verifyToken, getAllMenusController);

// Obtener un menú por ID
menuRouter.get("/:menuId", verifyToken, getMenuByIdController);

// Actualizar un menú por ID
menuRouter.put("/:menuId", verifyToken, validateMenuId, updateMenuController);

// Eliminar un menú por ID
menuRouter.delete("/:menuId", verifyToken, validateMenuId, deleteMenuController);

export { menuRouter };
