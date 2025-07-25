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
    }
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
        enum: ['cliente', 'restAdmin', 'sysAdmin'],
        default: 'cliente',
        required: function () {
        return !this.isGoogle;
    }
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favorite',  // Referencia a los favoritos:D
        },
    ],
});

export const User = model('User', userSchema);
