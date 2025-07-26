import { 
    createCoordinate, 
    findCoordinates 
} from "../services/coordinate.service.js";


// Create coordinate controller
export const createCoordinateController = async (req, res, next) => {
    const { lat, lng } = req.body;

    try {
        const newCoordinate = await createCoordinate(lat, lng);
        res.status(201).json({ message: "Coordenadas creadas", data: newCoordinate });
    } catch (error) {
        next(error);
    }
};

// Get all coordinates controller
export const getCoordinatesController = async (req, res, next) => {
    try {
        const coordinates = await findCoordinates();
        res.status(200).json({ data: coordinates });
    } catch (error) {
        next(error);
    }
};
