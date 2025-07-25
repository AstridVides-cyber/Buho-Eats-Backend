import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: function () {
        return !this.isGoogle; 
    } // Last name is required only if the user is not registered via Google    
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    isGoogle: {
    type: Boolean,
    default: false
    },
    rol: {
        type: String,
        required: true,
        enum: ['cliente', 'restAdmin', 'sysAdmin'],  // Roles: cliente, restAdmin, sysAdmin
        default: 'cliente', 
        required: function () {
        return !this.isGoogle;
    }
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favorite',  // Reference to the favorite:D
        },
    ],
});

export const User = model('User', userSchema);
