import express from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import { connectiondb } from './src/config/dbconnetion.config.js';
import { mainRouter } from './src/routes/main.route.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Verificar que JWT_SECRET está correctamente cargado
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
connectiondb();

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});