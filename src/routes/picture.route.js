import { Router } from "express";
import { 
    saveImageController,
    addPicturesController,
    removePicturesController,
    findAllPicturesController,
    findPictureByIdController,
    deletePictureByIdController
} from "../controllers/picture.controllers.js";

const pictureRouter = Router();

// Crear una imagen
pictureRouter.post('/create', saveImageController);

// Agregar imágenes a un Restaurant
pictureRouter.post('/:id/add', addPicturesController);

// Eliminar imágenes de un Restaurant
pictureRouter.delete('/:id/remove', removePicturesController);

// Obtener todas las imágenes
pictureRouter.get('/all', findAllPicturesController);

// Obtener una imagen por ID
pictureRouter.get('/:id', findPictureByIdController);

// Eliminar una imagen por ID
pictureRouter.delete('/:id', deletePictureByIdController);

export { pictureRouter };
