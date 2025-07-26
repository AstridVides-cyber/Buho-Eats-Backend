import { Coordinate } from "../models/coordinate.model.js";

// Create a new coordinate
export const createCoordinate = async (lat, lng) => {
    try {
        const coordinate = new Coordinate({ lat, lng });
        await coordinate.save();
        return coordinate;
    } catch (error) {
        throw new Error(`Error al crear las coordenadas: ${error.message}`);
    }
};

// Get a coordinate by ID
export const findCoordinates = async () => {
    try {
        const coordinates = await Coordinate.find();
        return coordinates;
    } catch (error) {
        throw new Error(`Error al obtener las coordenadas: ${error.message}`);
    }
};
