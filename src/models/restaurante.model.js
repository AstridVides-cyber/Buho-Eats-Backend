import mongoose, { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    direction: {
        type: String,
        required: true,
    },
    idCoordinate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coordinate", // Reference to the coordinates:D
        required: false,
    },
    idPictures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture', // Reference to the pictures:D
        required: false,
    },
    idMenu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', // Reference to the menu:D
        required: false,
    },
    idPromotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotion', // Reference to the promotions:D
        required: false,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user:D
        required: true,
    },
    idReviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',  // Reference to the reviews:D
        required: false,
    },
    idBlocks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block',   // Reference to the blocks:D
        required: false,
    },
    idTimeRange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timeRange', // Reference to the time range:D
        required: false,
    },
    onWait: {
        type: Boolean,
        required: true,
    }
});

export const Restaurant = model('Restaurant', restaurantSchema);
