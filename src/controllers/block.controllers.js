import { 
    createBlock, 
    deleteBlock 
} from "../services/block.service.js";


// Block a user
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

// Unblock a user
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
