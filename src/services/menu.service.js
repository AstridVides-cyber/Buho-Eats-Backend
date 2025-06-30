import { Menu } from "../models/menu.model.js";
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors";


// Crear menú
export const createMenu = async (restaurantId, plates) => {
    try {
        const newMenu = new Menu({
        restaurantId,
        plates
        });

        // Guardar el menú en la base de datos
        const savedMenu = await newMenu.save();
        return savedMenu;
    } catch (error) {
        throw createError(400, `Error al crear el menú: ${error.message}`);
    }
};


// Obtener todos los menús
export const getAllMenus = async () => {
    try {
        const menus = await Menu.find();
        return menus;
    } catch (error) {
        throw new Error(`Error al obtener los menús: ${error.message}`);
    }
};

// Obtener un menú por su ID
export const getMenuById = async (menuId) => {
    try {
        const menu = await Menu.findById(menuId);
        if (!menu) throw createError(404, "Menú no encontrado");
        return menu;
    } catch (error) {
        throw new Error(`Error al obtener el menú: ${error.message}`);
    }
};

// Actualizar un menú por su ID
export const updateMenu = async (menuId, updatedData) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updatedData, { new: true });
        if (!updatedMenu) throw createError(404, "Menú no encontrado");
        return updatedMenu;
    } catch (error) {
        throw new Error(`Error al actualizar el menú: ${error.message}`);
    }
};

// Eliminar un menú por su ID
export const deleteMenu = async (menuId, restaurantId) => {
    try {
        const menu = await Menu.findByIdAndDelete(menuId);
        if (!menu) throw createError(404, "Menú no encontrado");

        // Eliminar el menú del restaurante
        await Restaurant.findByIdAndUpdate(restaurantId, { $pull: { idMenu: menuId } });

        return menu;
    } catch (error) {
        throw new Error(`Error al eliminar el menú: ${error.message}`);
    }
};

// Obtener todos los menús
export const getMenus = async () => {
        try {
        const menus = await Menu.find();
        return menus;
        } catch (error) {
        throw new Error(`Error al obtener los menús: ${error.message}`);
        }
};