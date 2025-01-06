const mongoose = require('mongoose');

const { Schema } = mongoose

const cart = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applicant',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            model: {
                type: String,
                required: true,
                enum: ['Menutable', 'moreMeals']
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            }
        }
    ],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

const individualCart = mongoose.model('userCart', cart)

module.exports = individualCart;