import mongoose, { Schema, model } from 'mongoose';

const contactInfoSchema = new Schema({
    email: { type: String, required: false },
    phone: { type: String, required: false },
    hours: { type: String, required: false },
    address: { type: String, required: false }
}, { _id: false });

const ratingSchema = new Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: true }
}, { _id: false });

const commentSchema = new Schema({
    userId: { type: String, required: true },
    comment: { type: String, required: true }
}, { _id: false });

const dishSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true }
}, { _id: false });

const promoSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    promprice: { type: String, required: true },
    reglas: { type: String, required: true },
    restaurantId: { type: String, required: true }
}, { _id: false });

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    category: { type: String, required: true },
    contactInfo: { type: contactInfoSchema, required: true },
    ratings: { type: [ratingSchema], default: [] },
    comments: { type: [commentSchema], default: [] },
    menu: { type: [dishSchema], default: [] },
    promos: { type: [promoSchema], default: [] },
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    admin: { type: String, required: true },
    blockedUsers: { type: [String], default: [] }
});

export const Restaurant = model('Restaurant', restaurantSchema);
