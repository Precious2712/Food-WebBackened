
const express = require('express');

const quantityRoute = express.Router();

const {
    updateQuantity
} = require('../contoller/quantity');

const {
    checkCurrentUserToken,
} = require('../middleware/checkCurrentUserToken');

quantityRoute.patch('/quantity/:id', checkCurrentUserToken, updateQuantity)

module.exports = quantityRoute;