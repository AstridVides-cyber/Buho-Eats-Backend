import { 
    createPlate, 
    findAllPlates, 
    findPlateById, 
    updatePlateById, 
    deletePlateById 
} from "../services/plate.service.js";
import { Restaurant } from "../models/restaurante.model.js";
import createError from "http-errors";

// Utilidad para construir la URL completa de la imagen de plato
const getPlateImageUrl = (req, filename) => {
    if (!filename) return null;
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// Crear un plato
export const createPlateController = async (req, res, next) => {
    try {
        // Usar directamente los datos del body, ya no se crea Picture
        const plateData = req.body;
        const plate = await createPlate(plateData);

        // Agregar el plato al menú del restaurante correspondiente
        if (plate.idRestaurant) {
            // Construir el objeto plato para el menú (con los campos requeridos por el schema)
            const dishForMenu = {
                id: plate._id.toString(),
                name: plate.name,
                description: plate.description,
                imageUrl: plate.imageUrl,
                price: plate.price
            };
            await Restaurant.findByIdAndUpdate(
                plate.idRestaurant,
                { $push: { menu: dishForMenu } },
                { new: true }
            );
        }

        // Transformar el plato para el frontend
        const p = plate;
        const plateForFrontend = {
            id: p._id,
            name: p.name,
            description: p.description,
            imageUrl: p.imageUrl,
            price: p.price?.toString() || ''
        };
        res.status(201).json({ message: "Plato creado con éxito", data: plateForFrontend });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los platos
export const findAllPlatesController = async (req, res, next) => {
    try {
        const plates = await findAllPlates();
        res.status(200).json({ data: plates });
    } catch (error) {
        next(error);
    }
};

// Obtener un plato 
export const findPlateByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const plate = await findPlateById(id);
        if (!plate) return res.status(404).json({ message: "Plato no encontrado" });
        const plateForFrontend = {
            id: plate._id,
            name: plate.name,
            description: plate.description,
            imageUrl: plate.imageUrl,
            price: plate.price?.toString() || ''
        };
        res.status(200).json({ data: plateForFrontend });
    } catch (error) {
        next(error);
    }
};

// Actualizar plato
export const updatePlateController = async (req, res, next) => {
    const { id, dishId } = req.params;
    const plateData = { ...req.body };
    // Permitir ambos: /plates/:id o /plates/:dishId
    const plateId = id || dishId;
    try {
        if (req.file) {
            plateData.imageUrl = req.file.filename;
        }
        const updatedPlate = await updatePlateById(plateId, plateData);
        if (!updatedPlate) return res.status(404).json({ message: "Plato no encontrado" });
        const plateForFrontend = {
            id: updatedPlate._id,
            name: updatedPlate.name,
            description: updatedPlate.description,
            imageUrl: updatedPlate.imageUrl,
            price: updatedPlate.price?.toString() || ''
        };
        res.status(200).json({ message: "Plato actualizado con éxito", data: plateForFrontend });
    } catch (error) {
        next(error);
    }
};

// Eliminar plato
export const deletePlateController = async (req, res, next) => {
    // Cambia a dishId para que coincida con la ruta
    const { dishId } = req.params;
    try {
        // Elimina el plato de la colección Plate
        const deletedPlate = await deletePlateById(dishId);
        // Si el plato tiene idRestaurant, eliminarlo también del menú del restaurante
        if (deletedPlate && deletedPlate.idRestaurant) {
            await Restaurant.findByIdAndUpdate(
                deletedPlate.idRestaurant,
                { $pull: { menu: { id: dishId } } }
            );
        }
        res.status(200).json({ message: "Plato eliminado con éxito", data: deletedPlate });
    } catch (error) {
        next(error);
    }
};
