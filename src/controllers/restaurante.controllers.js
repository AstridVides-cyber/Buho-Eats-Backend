import { 
    createRestaurant, 
    findRestaurantById, 
    getRestaurants, 
    updateRestaurantById, 
    deleteRestaurantById 
} from "../services/restaurante.service.js";
import { removeFavoriteIfExists } from "../services/user.service.js";

// Utilidad para construir la URL completa de la imagen de restaurante
const getRestaurantImageUrl = (req, filename) => {
    if (!filename) return null;
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// Crear restaurante
export const createRestaurantController = async (req, res, next) => {
    try {
        const restaurantData = req.body;
        const newRestaurant = await createRestaurant(restaurantData);
        const r = newRestaurant;
        const restaurantForFrontend = {
            id: r._id.toString(),
            name: r.name,
            description: r.description,
            imageUrl: r.imageUrl,
            category: r.category,
            contactInfo: r.contactInfo,
            ratings: r.ratings || [],
            comments: r.comments || [],
            menu: r.menu,
            promos: r.promos,
            latitud: r.latitud,
            longitud: r.longitud,
            admin: r.admin,
            blockedUsers: r.blockedUsers || []
        };
        res.status(201).json({ success: true, message: "Restaurante creado correctamente", data: restaurantForFrontend });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message || "Error al crear el restaurante" });
    }
};

// Obtener restaurante por ID
export const getRestaurantByIdController = async (req, res, next) => {
    try {
        const r = await findRestaurantById(req.params.id);
        // Mapear promos para incluir id como string
        const promosWithId = (r.promos || []).map(p => ({
            ...p.toObject(),
            id: p.id || (p._id ? p._id.toString() : undefined)
        }));
        // Mapear ratings y comments para estructura frontend
        const ratings = (r.ratings || []).map(rt => ({
            userId: rt.userId?.toString() || rt.userId,
            rating: rt.rating
        }));
        const comments = (r.comments || []).map(cm => ({
            userId: cm.userId?.toString() || cm.userId,
            comment: cm.comment
        }));
        const restaurantForFrontend = {
            id: r._id.toString(),
            name: r.name,
            description: r.description,
            imageUrl: r.imageUrl,
            category: r.category,
            contactInfo: r.contactInfo,
            ratings,
            comments,
            menu: r.menu,
            promos: promosWithId,
            latitud: r.latitud,
            longitud: r.longitud,
            admin: r.admin,
            blockedUsers: r.blockedUsers || []
        };
        res.status(200).json({ message: "Restaurante encontrado", data: restaurantForFrontend });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los restaurantes
export const getRestaurantsController = async (req, res, next) => {
    try {
        const restaurants = await getRestaurants();
        const restaurantsForFrontend = restaurants.map(r => {
            const promosWithId = (r.promos || []).map(p => ({
                ...p.toObject(),
                id: p.id || (p._id ? p._id.toString() : undefined)
            }));
            const ratings = (r.ratings || []).map(rt => ({
                userId: rt.userId?.toString() || rt.userId,
                rating: rt.rating
            }));
            const comments = (r.comments || []).map(cm => ({
                userId: cm.userId?.toString() || cm.userId,
                comment: cm.comment
            }));
            return {
                id: r._id.toString(),
                name: r.name,
                description: r.description,
                imageUrl: r.imageUrl,
                category: r.category,
                contactInfo: r.contactInfo,
                ratings,
                comments,
                menu: r.menu,
                promos: promosWithId,
                latitud: r.latitud,
                longitud: r.longitud,
                admin: r.admin,
                blockedUsers: r.blockedUsers || []
            };
        });
        res.status(200).json({ message: "Restaurantes encontrados", data: restaurantsForFrontend });
    } catch (error) {
        next(error);
    }
};

// Actualizar restaurante por ID
export const updateRestaurantController = async (req, res, next) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = req.file.filename;
        }
        const r = await updateRestaurantById(req.params.id, updateData);
        const restaurantForFrontend = {
            id: r._id.toString(),
            name: r.name,
            description: r.description,
            imageUrl: r.imageUrl,
            category: r.category,
            contactInfo: r.contactInfo,
            ratings: r.ratings || [],
            comments: r.comments || [],
            menu: r.menu,
            promos: r.promos,
            latitud: r.latitud,
            longitud: r.longitud,
            admin: r.admin,
            blockedUsers: r.blockedUsers || []
        };
        res.status(200).json({ message: "Restaurante actualizado correctamente", data: restaurantForFrontend });
    } catch (error) {
        next(error);
    }
};

// Eliminar restaurante por ID
export const deleteRestaurantController = async (req, res, next) => {
    try {
        await deleteRestaurantById(req.params.id);
        res.status(200).json({ message: "Restaurante eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

// Actualizar solo la imagen del restaurante
export const updateRestaurantImageController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const imageUrl = req.file ? req.file.filename : req.body.imageUrl;
        const updated = await updateRestaurantById(id, { imageUrl });
        if (!updated) return res.status(404).json({ message: "Restaurante no encontrado" });
        res.status(200).json({ message: "Imagen actualizada", imageUrl: getRestaurantImageUrl(req, updated.imageUrl) });
    } catch (error) {
        next(error);
    }
};

// Eliminar un plato del menú del restaurante
export const deleteDishFromRestaurantController = async (req, res, next) => {
    try {
        const { restaurantId, dishId } = req.params;
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        restaurant.menu = restaurant.menu.filter(dish => dish.id !== dishId);
        await restaurant.save();
        res.status(200).json({ message: "Plato eliminado del menú", menu: restaurant.menu });
    } catch (error) {
        next(error);
    }
};

// Obtener usuarios bloqueados
export const getBlockedUsersController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const restaurant = await findRestaurantById(id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        res.status(200).json({ blockedUsers: restaurant.blockedUsers || [] });
    } catch (error) {
        next(error);
    }
};

// Bloquear usuario
export const blockUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const restaurant = await findRestaurantById(id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        if (!restaurant.blockedUsers.includes(userId)) {
            restaurant.blockedUsers.push(userId);
            await restaurant.save();
            // Eliminar el restaurante de los favoritos del usuario si lo tiene
            await removeFavoriteIfExists(userId, id);
        }
        res.status(200).json({ message: "Usuario bloqueado", blockedUsers: restaurant.blockedUsers });
    } catch (error) {
        next(error);
    }
};

// Desbloquear usuario
export const unblockUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const restaurant = await findRestaurantById(id);
        if (!restaurant) return res.status(404).json({ message: "Restaurante no encontrado" });
        restaurant.blockedUsers = restaurant.blockedUsers.filter(u => u !== userId);
        await restaurant.save();
        res.status(200).json({ message: "Usuario desbloqueado", blockedUsers: restaurant.blockedUsers });
    } catch (error) {
        next(error);
    }
};


