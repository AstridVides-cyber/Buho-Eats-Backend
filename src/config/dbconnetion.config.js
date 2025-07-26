import mongoose from "mongoose";
import 'dotenv/config';

// Database connection configuration
export const connectiondb = async () => {
    const URI = process.env.MONGODB_URI;

    if (!URI) throw new Error('No se pudo conectar con la base de datos:(');

    try {
        await mongoose.connect(URI);
        console.log("Base datos conectada:D")
    } catch (error) {
        console.error(error);
        throw new Error("Error al iniciar la base de datos:(");
        
    }
}