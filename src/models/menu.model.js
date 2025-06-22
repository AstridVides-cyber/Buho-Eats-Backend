import mongoose, { Schema, model } from 'mongoose';

const menuSchema = new Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', 
        required: true 
    },
    plates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plate',
        required: true
    }]
});

const Menu = model('Menu', menuSchema);

export { Menu };
