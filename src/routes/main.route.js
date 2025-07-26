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

// User routes
mainRouter.use('/api/usuario', userRouter); 

// Favorite routes
mainRouter.use('/api/usuario/:id/favoritos', favoriteRouter); 

// Promotion routes
mainRouter.use('/api/restaurante', restaurantRouter); 

// Images routes
mainRouter.use('/api/restaurante/:restaurantId/promotion', promotionRouter);

// Restaurant routes
mainRouter.use('/api/restaurante/:restaurantId/bloquear', blockRouter);

// Review routes
mainRouter.use('/api/restaurante/:restaurantId/review', reviewRouter); 

// Additional routes for menus
mainRouter.use("/api/timeRange", timeRangeRouter); 

// Coordinates routes
mainRouter.use("/api/coordenadas", coordinateRouter);

// Route for menus within a restaurant
mainRouter.use('/api/restaurante/:restaurantId/menu', menuRouter); 

// Route for plates within a menu
mainRouter.use('/api/restaurante/:restaurantId/menu/plato', plateRouter);

// Route for pictures
mainRouter.use('/api/picture', pictureRouter);

export { mainRouter };
