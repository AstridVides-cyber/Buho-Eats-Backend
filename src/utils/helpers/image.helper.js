// Helper para validar imágenes (base64 o URL)

// Regex para URLs de imágenes
const URL_REGEX = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;

// Regex para base64 de imágenes
const BASE64_REGEX = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/i;

/**
 * Valida si una cadena es una URL de imagen válida o una cadena base64 de imagen
 * @param {string} imageString - La cadena a validar
 * @returns {boolean} - true si es válida, false si no
 */
export const isValidImageString = (imageString) => {
    if (!imageString || typeof imageString !== 'string') {
        return false;
    }

    // Verificar si es una URL válida
    if (URL_REGEX.test(imageString)) {
        return true;
    }

    // Verificar si es base64 válido
    if (BASE64_REGEX.test(imageString)) {
        return true;
    }

    return false;
};

/**
 * Determina el tipo de imagen (URL o base64)
 * @param {string} imageString - La cadena de imagen
 * @returns {string} - 'url', 'base64' o 'invalid'
 */
export const getImageType = (imageString) => {
    if (!imageString || typeof imageString !== 'string') {
        return 'invalid';
    }

    if (URL_REGEX.test(imageString)) {
        return 'url';
    }

    if (BASE64_REGEX.test(imageString)) {
        return 'base64';
    }

    return 'invalid';
};

/**
 * Validador personalizado para express-validator
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si es válido
 * @throws {Error} - Si no es válido
 */
export const validateImageString = (value) => {
    if (!isValidImageString(value)) {
        throw new Error('La imagen debe ser una URL válida (http/https con extensión jpg, jpeg, png, gif, webp) o una cadena base64 válida (data:image/...)');
    }
    return true;
};

/**
 * Validador personalizado para arrays de imágenes en express-validator
 * @param {Array} value - El array de imágenes a validar
 * @returns {boolean} - true si es válido
 * @throws {Error} - Si no es válido
 */
export const validateImageArray = (value) => {
    if (!Array.isArray(value)) {
        throw new Error('Las imágenes deben ser un array');
    }
    
    if (value.length === 0) {
        throw new Error('Debe proporcionar al menos una imagen');
    }
    
    for (let i = 0; i < value.length; i++) {
        if (!isValidImageString(value[i])) {
            throw new Error(`La imagen en la posición ${i + 1} debe ser una URL válida o una cadena base64 válida`);
        }
    }
    
    return true;
};
