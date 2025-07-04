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
        ref: "Coordinate",
        required: false,
    },
    idPictures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture',
        required: false,
    },
    idMenu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: false,
    },
    idPromotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotion',
        required: false,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idReviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: false,
    },
    idBlocks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block',
        required: false,
    },
    idTimeRange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timeRange',
        required: false,
    },
    onWait: {
        type: Boolean,
        required: true,
    }
});

export const Restaurant = model('Restaurant', restaurantSchema);
