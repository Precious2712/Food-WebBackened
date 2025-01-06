const moongoose = require('mongoose');

const { Schema } = moongoose;

const menuTableSchema = Schema({
    // owner: {
    //     type: ObjectID,
    //     required: true,
    //     ref: 'applicant'
    // },
    // name: {
    //     type: String,
    //     required: true
    // },

    // description: {
    //     type: String,
    //     required: true
    // },

    // image: {
    //     type: String,
    //     required: true
    // },

    // price: {
    //     type: Number,
    //     required: true
    // }

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