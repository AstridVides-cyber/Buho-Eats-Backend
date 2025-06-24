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
// /api/usuario
mainRouter.use('/api/usuario', userRouter); 

// Ruta para los favoritos de un usuario:D
// /api/usuario/:id/favoritos
mainRouter.use('/api/usuario/:id/favoritos', favoriteRouter); 

// Ruta para restaurantes:D
// /api/restaurante
mainRouter.use('/api/restaurante', restaurantRouter); 

// Ruta para el menú de un restaurante:D
// /api/restaurante/:id/menu
mainRouter.use('/api/restaurante/:restaurantId/menu', menuRouter); 

// Promociones Rutas:D
///api/restaurante/id/promocion/
mainRouter.use('/api/restaurante', promotionRouter);

// Bloqueo Rutas:D
// /api/restaurante/:id/bloquear
mainRouter.use('/api/restaurante/:id/bloquear', blockRouter);

// Rutas de reseñas:D
// /api/restaurante/:id/review
mainRouter.use('api/restaurante/:id/review', reviewRouter); 


// Ruta para los platos dentro de un menú
mainRouter.use('/api/restaurante/:id/menu/plato', plateRouter);



// Ruta para las imágenes
mainRouter.use('/api/picture', pictureRouter); 

// Agregar rutas de TimeRange:D
mainRouter.use("/api/timeRange", timeRangeRouter); 

// Rutas de coordenadas:D
mainRouter.use("/api/coordenadas", coordinateRouter);











export { mainRouter };
