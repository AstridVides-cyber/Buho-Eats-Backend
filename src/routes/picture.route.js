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

// Create a new picture:D
pictureRouter.post("/create/:idRestaurant", verifyToken, validateCreatePicture, createPictureController);

// Get all pictures:D
pictureRouter.get("/all", getPicturesController);

// Get picture by ID:D
pictureRouter.get("/getOne/:id",  findPictureByIdController);

// Add pictures:D
pictureRouter.put("/add", verifyToken, validateAddPictures, addPicturesController);

// Delete picture:D
pictureRouter.delete("/delete", verifyToken, validateDeletePicture, deletePictureController);

// Remove pictures:D
pictureRouter.delete("/remove", verifyToken, validateRemovePictures, removePicturesController);

export { pictureRouter };