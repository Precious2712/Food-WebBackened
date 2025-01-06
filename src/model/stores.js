const moongoose = require('mongoose')

const { Schema } = moongoose

const moreFoodStore = Schema({
    name: {
        type: String,
        required: true,
    },
    mainImage: {
        type: String,
        required: true,
    },

    picture: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            }
        }
    ]
});

const meal = moongoose.model('moreMeals', moreFoodStore)

module.exports = meal;