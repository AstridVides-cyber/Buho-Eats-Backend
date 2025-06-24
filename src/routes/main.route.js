import { Router } from "express";
import { userRouter } from "./user.route.js";
import { restaurantRouter } from "./restaurante.route.js";
import { pictureRouter } from "./picture.route.js";
import { reviewRouter } from "./review.route.js";
import { favoriteRouter } from "./favorite.route.js";
import { promotionRouter } from "./promotion.route.js";
import { menuRouter } from "./menu.route.js";
import { plateRouter } from "./plate.route.js";
import { timeRangeRouter } from "./date.route.js";
import { blockRouter } from "./block.route.js";
import { coordinateRouter } from "./coordinate.route.js";

const mainRouter = Router();

// Ruta para los usuarios:D
mainRouter.use('/api/usuario', userRouter); 

// Ruta para los favoritos de un usuario:D
mainRouter.use('/api/usuario/:id/favoritos', favoriteRouter); 

// Ruta para restaurantes:D
mainRouter.use('/api/restaurante', restaurantRouter); 

// Promociones Rutas:D
mainRouter.use('/api/restaurante', promotionRouter);

// Ruta para el menú de un restaurante:D
mainRouter.use('/api/restaurante/:restaurantId/menu', menuRouter); 

// Rutas de reseñas:D
mainRouter.use('api/restaurante/:id/review', reviewRouter); 


// Ruta para los platos dentro de un menú
mainRouter.use('/api/restaurante/:id/menu/plato', plateRouter);

// Agregar rutas de TimeRange:D
mainRouter.use("/api/timeRange", timeRangeRouter); 

// Bloqueo Rutas:D
mainRouter.use('/api/restaurante', blockRouter);

// Rutas de coordenadas:D
mainRouter.use("/api/coordenadas", coordinateRouter);


// Ruta para las imágenes
mainRouter.use('/api/picture', pictureRouter); 




export { mainRouter };
