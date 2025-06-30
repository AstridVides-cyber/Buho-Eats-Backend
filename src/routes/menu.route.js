import { Router } from "express";
import {
    createMenuController,
    getAllMenusController,
    getMenuByIdController,
    updateMenuController,
    deleteMenuController,
} from "../controllers/menu.controllers.js";
import { validateMenuId } from "../validators/menu.validator.js";  

const menuRouter = Router();

// Crear un menú para un restaurante
menuRouter.post("/create", createMenuController);

// Obtener todos los menús
menuRouter.get("/all", getAllMenusController);

// Obtener un menú por ID
menuRouter.get("/:menuId", getMenuByIdController);

// Actualizar un menú por ID
menuRouter.put("/:menuId", validateMenuId, updateMenuController);

// Eliminar un menú por ID
menuRouter.delete("/:menuId", validateMenuId, deleteMenuController);

export { menuRouter };
