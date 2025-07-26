import { 
    createMenu, 
    getAllMenus,
    getMenus, 
    getMenuById, 
    updateMenu, 
    deleteMenu 
} from "../services/menu.service.js";


// Create menu controller
export const createMenuController = async (req, res, next) => {
    const { restaurantId, plates } = req.body;

    try {
        // Call the service to create a new menu
        const newMenu = await createMenu(restaurantId, plates);

        // Return the created menu with a success message
        res.status(201).json({
        message: "Menú creado con éxito",
        data: newMenu
        });
    } catch (error) {
        next(error);
    }
};


// Get all menus controller
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


// Get menus by restaurant ID
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


// Update menu controller
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


// Delete menu controller
export const deleteMenuController = async (req, res, next) => {
    const { menuId } = req.params;
    const { restaurantId } = req.body;  // Assuming restaurantId is needed for deletion

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


// Get all menus
export const getMenusController = async (req, res, next) => {
    try {
        const menus = await getMenus(); 
        res.status(200).json({ data: menus }); 
    } catch (error) {
        next(error);
    }
};
