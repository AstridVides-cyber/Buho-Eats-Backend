import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
    return res.status(403).json({ message: "No se proporcionó token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token no válido" });
        }
        req.user = decoded;
        next();
    });
};