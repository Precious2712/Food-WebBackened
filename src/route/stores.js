const expresses = require('express')

const passageroute = expresses.Router();

const {
    allFoodVendors,
    gettingFoodDelivery,
    gettingFoodVendors
} = require('../contoller/stores');

passageroute.post('/foodDelivery', allFoodVendors);
passageroute.get('/getAllFoodDelivery', gettingFoodDelivery);
passageroute.get('/getAllFoodVendors/:id', gettingFoodVendors);

module.exports = passageroute;