
const express = require('express');

const cartroute = express.Router();

const {
    userCart,
    getCustomerCart,
    deleteCustomerCart
} = require('../contoller/cart');

const {
    checkCurrentUserToken,
} = require('../middleware/checkCurrentUserToken');

cartroute.post('/createUserCart', checkCurrentUserToken, userCart)
cartroute.get('/getUserCart', checkCurrentUserToken, getCustomerCart)
cartroute.delete('/deleteUserCart/:id', checkCurrentUserToken, deleteCustomerCart)

module.exports = cartroute;