import { Router } from "express";
import { 
    saveImageController, 
    getAllPicturesController, 
    getPictureByIdController, 
    deletePictureByIdController 
} from "../controllers/picture.controllers.js";

const pictureRouter = Router();

// Crear una nueva imagen
pictureRouter.post('/create', saveImageController);

// Obtener todas las imágenes
pictureRouter.get('/all', getAllPicturesController);

// Obtener una imagen específica por ID
pictureRouter.get('/:id', getPictureByIdController);

// Eliminar una imagen por ID
pictureRouter.delete('/:id', deletePictureByIdController);

export { pictureRouter };
