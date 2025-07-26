import { OAuth2Client } from "google-auth-library";
import createError from 'http-errors';
import "dotenv/config";

// Google OAuth2 client configuration
export const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI_1
);

// Middleware to verify Google ID token
export const verifyGoogleToken = async (req, res, next) => {
  //If the request does not contain an id_token, throw an error
    const { id_token } = req.body;

    if (!id_token)
        return next(createError(400, 'No se a proporcionado el token'));

    try {
        const ticket = await client.verifyIdToken({
        id_token,
        audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.user = payload;

        next();
    } catch (error) {
        throw new Error(`Hubo un error al validar el token: ${error.message}`);
    }
};