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
mainRouter.use('/api/restaurante/:restaurantId/promotion', promotionRouter);

// Bloqueo Rutas:D
mainRouter.use('/api/restaurante/:restaurantId/bloquear', blockRouter);

// Rutas de reseñas:D
mainRouter.use('/api/restaurante/:restaurantId/review', reviewRouter); 

// Agregar rutas de TimeRange:D
mainRouter.use("/api/timeRange", timeRangeRouter); 

// Rutas de coordenadas:D
mainRouter.use("/api/coordenadas", coordinateRouter);

// Ruta para el menú de un restaurante
mainRouter.use('/api/restaurante/:restaurantId/menu', menuRouter); 

// Ruta para los platos dentro de un menú
mainRouter.use('/api/restaurante/:restaurantId/menu/plato', plateRouter);

// Ruta para las imágenes
mainRouter.use('/api/picture', pictureRouter); 

export { mainRouter };
