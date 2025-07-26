import { timeRange } from "../models/date.model.js";

// Create a new time range
export const createTimeRange = async (data) => {
    try {
        const newTimeRange = new timeRange(data);
        const savedTimeRange = await newTimeRange.save();
        return savedTimeRange;
    } catch (error) {
        throw new Error(`Error al crear el rango de tiempo: ${error.message}`);
    }
};

// Get all time ranges
export const findTimeRangeById = async (id) => {
    try {
        const time = await timeRange.findById(id);
        return time;
    } catch (error) {
        throw new Error(`Error al obtener el rango de tiempo: ${error.message}`);
    }
};
