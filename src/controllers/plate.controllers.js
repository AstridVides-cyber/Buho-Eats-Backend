import { 
    createPlate, 
    findAllPlates, 
    findPlateById, 
    updatePlateById, 
    deletePlateById 
} from "../services/plate.service.js";
import createError from "http-errors";

// Crear un plato
export const createPlateController = async (req, res, next) => {
    const { url, idRestaurant } = req.body; // URL de la imagen y ID del restaurante
    try {
        // Creamos una imagen primero en el servicio de Picture
        const picture = new Picture({ url, idRestaurant });
        const savedPicture = await picture.save();  // Guardamos la imagen

        // Ahora pasamos la imagen guardada en el objeto para crear el plato
        const plateData = { ...req.body, image: savedPicture._id }; // Asocian la imagen al plato
        const plate = await createPlate(plateData); // Guardamos el plato

        res.status(201).json({ message: "Plato creado con éxito", data: plate });
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
        res.status(200).json({ data: plate });
    } catch (error) {
        next(error);
    }
};

// Actualizar plato
export const updatePlateController = async (req, res, next) => {
    const { id } = req.params;
    const plateData = req.body;
    try {
        const updatedPlate = await updatePlateById(id, plateData);
        res.status(200).json({ message: "Plato actualizado con éxito", data: updatedPlate });
    } catch (error) {
        next(error);
    }
};

// Eliminar plato
export const deletePlateController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPlate = await deletePlateById(id);
        res.status(200).json({ message: "Plato eliminado con éxito", data: deletedPlate });
    } catch (error) {
        next(error);
    }
};
