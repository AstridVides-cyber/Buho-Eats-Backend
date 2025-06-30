import createError from "http-errors";
import { 
    createMenu, 
    getAllMenus,
    getMenus, 
    getMenuById, 
    updateMenu, 
    deleteMenu 
} from "../services/menu.service.js";


// Controlador para crear un menú
export const createMenuController = async (req, res, next) => {
    const { restaurantId, plates } = req.body;

    try {
        // Llamar al servicio para crear el menú
        const newMenu = await createMenu(restaurantId, plates);

        // Responder con el menú creado
        res.status(201).json({
        message: "Menú creado con éxito",
        data: newMenu
        });
    } catch (error) {
        next(error);
    }
};


// Obtener todos los menús
export const getAllMenusController = async (req, res, next) => {
    try {
        const menus = await getAllMenus();
        res.status(200).json({
        message: "Se obtuvieron todos los menús",
        data: menus,
        });
    } catch (error) {
        next(error);
    }
};

// Obtener un menú por su ID
export const getMenuByIdController = async (req, res, next) => {
    const { menuId } = req.params;

    try {
        const menu = await getMenuById(menuId);
        res.status(200).json({
        message: "Se obtuvo el menú",
        data: menu,
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un menú por su ID
export const updateMenuController = async (req, res, next) => {
    const { menuId } = req.params;
    const updatedData = req.body;

    try {
        const updatedMenu = await updateMenu(menuId, updatedData);
        res.status(200).json({
        message: "Menú actualizado correctamente",
        data: updatedMenu,
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar un menú por su ID
export const deleteMenuController = async (req, res, next) => {
    const { menuId } = req.params;
    const { restaurantId } = req.body;  // El ID del restaurante donde se encuentra el menú

    try {
        await deleteMenu(menuId, restaurantId);
        res.status(200).json({
        success: true,
        message: "Menú eliminado correctamente",
        });
    } catch (error) {
        next(error);
    }
};

//get menus
export const getMenusController = async (req, res, next) => {
    try {
        const menus = await getMenus(); 
        res.status(200).json({ data: menus }); 
    } catch (error) {
        next(error);
    }
};
