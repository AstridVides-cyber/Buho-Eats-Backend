import { 
    createPlate, 
    deletePlateById, 
    findAllPlates, 
    findPlateById, 
    updatePlateById 
} from "../services/plate.service.js";
import createError from "http-errors";

export const createPlateController = async (req, res, next) => {
    const image = req.file.filename;
    let platesData = req.body;

    platesData = { ...platesData, image: image };

    try {
    const plates = await createPlate(platesData);

    res.status(201).json({ message: "Se crearon los platos", data: plates });
    } catch (error) {
        next(error);
    }
};

export const findAllPlatesController = async (req, res, next) => {
    try {
    const plates = await findAllPlates();

    if(!plates)
        throw new createError(404, 'No se encontraron platos');

    res.status(200).json({ data: plates });
    } catch (error) {
        next(error);
    }
}

export const findPlateByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
    const plate = await findPlateById(id);

    if(!plate)
        throw new createError(404, 'No se encontro el plato');

        res.status(200).json({ data: plate });

    } catch (error) {
        next(error);
    }
}

export const updatePlateController = async (req, res, next) => {
    const image = req.file ? req.file.filename : null;
    const { id } = req.params;
    let data = req.body;

    if(image)
        data = {
        ...data,
        image: image
        }

    try {
    const existPlate = await findPlateById(id);

    if (!existPlate) throw new createError(404, "No se encontro el plato");

    await updatePlateById(id, data, existPlate.image);

    res.status(200).json({ message: 'Se actualizo el plato' });
    } catch (error) {
        next(error);
    }
};

export const deletePlateController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const existPlate = await findPlateById(id);

        if (!existPlate) throw new createError(404, "No se encontro el plato");

        await deletePlateById(id, existPlate.image);

        res.status(200).json({ message: 'Se elimino el plato' })
    } catch (error) {
        next(error);
    }
}