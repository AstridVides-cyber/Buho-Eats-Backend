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

// Create a new menu:D
menuRouter.post("/create", verifyToken, createMenuController);

// Get all menus:D
menuRouter.get("/all", getAllMenusController);

// Get menu by ID:D
menuRouter.get("/:menuId", getMenuByIdController);

// Update menu:D
menuRouter.put("/:menuId", verifyToken, validateMenuId, updateMenuController);

// Delete menu:D
menuRouter.delete("/:menuId", verifyToken, validateMenuId, deleteMenuController);

export { menuRouter };
