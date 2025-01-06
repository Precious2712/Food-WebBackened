const express = require('express')
const routes = express.Router();

const {
    getRequest,
    getCookies
} = require('../contoller/request');

routes.get('/request', getRequest);
routes.get('/cookies', getCookies);

module.exports = routes;