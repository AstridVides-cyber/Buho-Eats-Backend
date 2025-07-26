import { Menu } from "../models/menu.model.js";
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors";


// Create a new menu
export const createMenu = async (restaurantId, plates) => {
    try {
        const newMenu = new Menu({
        restaurantId,
        plates
        });

        // Add the new menu to the restaurant's idMenu array
        const savedMenu = await newMenu.save();
        return savedMenu;
    } catch (error) {
        throw createError(400, `Error al crear el menú: ${error.message}`);
    }
};


// Get all menus
export const getAllMenus = async () => {
    try {
        const menus = await Menu.find();
        return menus;
    } catch (error) {
        throw new Error(`Error al obtener los menús: ${error.message}`);
    }
};

// Get a menu by ID
export const getMenuById = async (menuId) => {
    try {
        const menu = await Menu.findById(menuId);
        if (!menu) throw createError(404, "Menú no encontrado");
        return menu;
    } catch (error) {
        throw new Error(`Error al obtener el menú: ${error.message}`);
    }
};

// Update a menu by ID
export const updateMenu = async (menuId, updatedData) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updatedData, { new: true });
        if (!updatedMenu) throw createError(404, "Menú no encontrado");
        return updatedMenu;
    } catch (error) {
        throw new Error(`Error al actualizar el menú: ${error.message}`);
    }
};

// Delete a menu by ID and remove it from the restaurant
export const deleteMenu = async (menuId, restaurantId) => {
    try {
        const menu = await Menu.findByIdAndDelete(menuId);
        if (!menu) throw createError(404, "Menú no encontrado");

        // Remove the menu from the restaurant's idMenu array
        await Restaurant.findByIdAndUpdate(restaurantId, { $pull: { idMenu: menuId } });

        return menu;
    } catch (error) {
        throw new Error(`Error al eliminar el menú: ${error.message}`);
    }
};

// Get menus by restaurant ID
export const getMenus = async () => {
        try {
        const menus = await Menu.find();
        return menus;
        } catch (error) {
        throw new Error(`Error al obtener los menús: ${error.message}`);
        }
};