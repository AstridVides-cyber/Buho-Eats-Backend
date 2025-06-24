import { Router } from "express";
import {
    addPicturesController,
    createPictureController,
    deletePictureController,
    findPictureByIdController,
    getPicturesController,
    removePicturesController,
} from "../controllers/picture.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    validateAddPictures, 
    validateCreatePicture, 
    validateDeletePicture, 
    validateRemovePictures 
} from "../validators/picture.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const pictureRouter = Router();

pictureRouter.post("/create/:idLocal", verifyToken, validateCreatePicture, createPictureController);
pictureRouter.get("/getAll", getPicturesController);
pictureRouter.get("/getOne/:id", findPictureByIdController);
pictureRouter.put("/add", verifyToken, validateAddPictures, upload.array('url', 5), addPicturesController);
pictureRouter.delete("/delete", verifyToken, validateDeletePicture, deletePictureController);
pictureRouter.delete("/remove", verifyToken, validateRemovePictures,upload.array('url', 10), removePicturesController);

export { pictureRouter };