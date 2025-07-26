import { timeRange } from "../models/date.model.js";
import createError from "http-errors";

// Create time range controller
export const createTimeRangeController = async (req, res, next) => {
    const { from, to } = req.body;

    try {
        const newTimeRange = new timeRange({ from, to });
        const savedTimeRange = await newTimeRange.save();

        res.status(201).json({
            message: "Time Range creado con éxito",
            data: savedTimeRange
        });
    } catch (error) {
        next(error);
    }
};

// Get all time ranges controller
export const findTimeRangeByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundTimeRange = await timeRange.findById(id);

        if (!foundTimeRange) {
            throw createError(404, "No se encontró el rango de tiempo");
        }

        res.status(200).json({
            message: "Rango de tiempo encontrado",
            data: foundTimeRange
        });
    } catch (error) {
        next(error);
    }
};
