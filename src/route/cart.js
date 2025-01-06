
const express = require('express');

const cartroute = express.Router();

const {
    userCart
} = require('../contoller/cart');

const {
    checkCurrentUserToken,
} = require('../middleware/checkCurrentUserToken');

cartroute.post('/createUserCart', checkCurrentUserToken, userCart)

module.exports = cartroute;