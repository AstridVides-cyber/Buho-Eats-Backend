import { Router } from "express";
import { 
    saveImageController, 
    getAllPicturesController, 
    getPictureByIdController, 
    deletePictureByIdController 
} from "../controllers/picture.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { 
    validateAddPictures, 
    validateCreatePicture, 
    validateDeletePicture, 
    validateRemovePictures 
} from "../validators/picture.validator.js";

const pictureRouter = Router();

// Crear una nueva imagen
pictureRouter.post("/create/:idRestaurant", validateCreatePicture, saveImageController);

// Obtener todas las imágenes
pictureRouter.get("/getAll", getAllPicturesController);

// Obtener una imagen específica por ID
pictureRouter.get("/getOne/:id", getPictureByIdController);

// Eliminar una imagen por ID
pictureRouter.delete("/delete", validateDeletePicture, deletePictureController);

pictureRouter.delete("/remove", validateRemovePictures,upload.array('url', 10), removePicturesController);

export { pictureRouter };
