import mongoose, { Schema, model } from 'mongoose';

const menuSchema = new Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',  // Reference to the restaurant:D
        required: true 
    },
    plates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plate', // Reference to the plates:D
        required: true
    }]
});

const Menu = model('Menu', menuSchema);

export { Menu };
