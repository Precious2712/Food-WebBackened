const express = require('express');

const passage = express.Router();

const {
    handleCategories,
    handleAllCategories,
    handleFoodImageById
} = require('../contoller/food');
const { checkCurrentUserToken } = require('../middleware/checkCurrentUserToken');

passage.post('/categories', handleCategories)
passage.get('/allCategories', handleAllCategories)
passage.get('/getAllCategories/:id', handleFoodImageById)
module.exports = passage;

//added a comment

// git add . 

// git commit -m "add comments to food.js" 

// git push 

// git remote set-url origin https://github.com/Precious2712/My-Movie-Page.git