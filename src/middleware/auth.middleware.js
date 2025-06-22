import { OAuth2Client } from "google-auth-library";
import createError  from 'http-errors';
import { User } from '../models/user.model.js';
import "dotenv/config"

export const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI_1
);

export const verifyGoogleToken = async (req, res, next) => {
    const { id_token } = req.body;

    if (!id_token) {
        return next(createError(400, 'No se a proporcionado el token'));
    }

    try {
        const ticket = await client.verifyIdToken({
            id_token,
            audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // Buscar el usuario por su Google ID (payload.sub)
        let user = await User.findOne({ googleId: payload.sub });
        req.user = payload;
        next();
    }catch (error) {
        next(createError(500, `Hubo un error al validar token: ${error.message}`));
        
    }
};