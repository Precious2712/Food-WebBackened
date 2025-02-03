const moongoose = require('mongoose');

const { Schema } = moongoose;

const menuTableSchema = Schema({

    name: {
        type: String,
        required: true
    }, 
    mainImage: {
        type : String,
        required: true
    },
    images: [
        {
            name: {type: String, required: true},
            description : {type: String, required: true},
            price : {type: String, required: true},
            imageUrl : {type: String, required: true}
        }
    ]

}, { timestamps: true })

const menu = moongoose.model('Menutable', menuTableSchema);

module.exports = menu;