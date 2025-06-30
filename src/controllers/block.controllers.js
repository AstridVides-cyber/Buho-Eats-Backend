import { 
    createBlock, 
    deleteBlock 
} from "../services/block.service.js";
import createError from "http-errors";

// Bloquear un usuario
export const createBlockController = async (req, res, next) => {
    const { id, usuarioId } = req.params;

    try {
        const newBlock = await createBlock(id, usuarioId); 
        res.status(201).json({
            message: "Usuario bloqueado correctamente",
        });
    } catch (error) {
        next(error);
    }
};

// Desbloquear un usuario
export const deleteBlockController = async (req, res, next) => {
    const { restauranteId, usuarioId } = req.params;

    try {
        await deleteBlock(restauranteId, usuarioId); 
        res.status(200).json({
            message: "Usuario desbloqueado correctamente",
        });
    } catch (error) {
        next(error);
    }
};
