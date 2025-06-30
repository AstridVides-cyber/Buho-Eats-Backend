import { Router } from "express";
import { userRouter } from "./user.route.js";
import { restaurantRouter } from "./restaurante.route.js";
import { promotionRouter } from "./promotion.route.js";
import { plateRouter } from "./plate.route.js";

const mainRouter = Router();

// Usuarios
mainRouter.use('/users', userRouter);

// Promociones (crear promo para restaurante) - DEBE IR ANTES QUE /restaurants
mainRouter.use('/restaurants/:restaurantId/promos', promotionRouter);
// Promos globales (update/delete por id)
mainRouter.use('/promos', promotionRouter);

// Platos (dishes) de restaurante
mainRouter.use('/restaurants/:restaurantId/dishes', plateRouter);

// Restaurantes
mainRouter.use('/restaurants', restaurantRouter);

mainRouter.use('/restaurants/:restaurantId/blocked-users', restaurantRouter);

export { mainRouter };
