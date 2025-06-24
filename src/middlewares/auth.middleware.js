import { OAuth2Client } from "google-auth-library";
import createError from 'http-errors';
import "dotenv/config";

export const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI_1
);

export const verifyGoogleToken = async (req, res, next) => {
  //Se obtiene la id del token
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