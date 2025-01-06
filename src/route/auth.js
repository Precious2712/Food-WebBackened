const express = require('express');
const router = express.Router();

const {
    signUpUser,
    loginUser,
    currentUser
} = require('../contoller/auth');

const {checkCurrentUserToken} = require('../middleware/checkCurrentUserToken')

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/currentUser', checkCurrentUserToken, currentUser);

module.exports = router;