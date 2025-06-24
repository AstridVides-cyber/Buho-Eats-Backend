import { Schema, model } from "mongoose";

const promotionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: {
            antes: Number,
            ahora: Number
        },
        required: false
    },
    rule: {
        type: String,
        required: true,
    },
    restaurantId: {  
        type: Schema.Types.ObjectId,
        ref: 'Restaurant', 
        required: true
    }
});

export const Promotion = model('Promotion', promotionSchema);
