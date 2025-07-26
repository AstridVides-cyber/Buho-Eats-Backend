import bcrypt from 'bcryptjs';

// Handle Bcrypt operations
export const encrypt = async (text) => {
    const hash = await bcrypt.hash(text, 10);
    return hash;
};

// Compare password with hash
export const compare = async (password, hashPassword) => {
    if(!password || !hashPassword) return false;
    else return await bcrypt.compare(password, hashPassword);
};