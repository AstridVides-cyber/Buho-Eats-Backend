import express from 'express';
import 'dotenv/config';
import { connectiondb } from './src/config/dbconnetion.config.js';
import { mainRouter } from './src/routes/main.route.js';
import { errorHandler } from './src/middlewares/error.middleware.js';


const app = express();
connectiondb();

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});