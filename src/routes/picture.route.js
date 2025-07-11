import { Router } from "express";
import {
    addPicturesController,
    createPictureController,
    deletePictureController, 
    findPictureByIdController,
    getPicturesController,
    removePicturesController,
} from "../controllers/picture.controllers.js";
import { 
    validateAddPictures, 
    validateCreatePicture, 
    validateDeletePicture, 
    validateRemovePictures 
} from "../validators/picture.validator.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const pictureRouter = Router();

pictureRouter.post("/create/:idRestaurant", verifyToken, validateCreatePicture, createPictureController);
pictureRouter.get("/all", getPicturesController);
pictureRouter.get("/getOne/:id",  findPictureByIdController);
pictureRouter.put("/add", verifyToken, validateAddPictures, addPicturesController);
pictureRouter.delete("/delete", verifyToken, validateDeletePicture, deletePictureController);
pictureRouter.delete("/remove", verifyToken, validateRemovePictures, removePicturesController);

export { pictureRouter };