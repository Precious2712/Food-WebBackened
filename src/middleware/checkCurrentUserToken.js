const jwt = require('jsonwebtoken');
const User = require('../model/auth');

const checkCurrentUserToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.split(" ")[1];
    // console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Token missing from header" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user
        next();
    } catch (error) {
        res.status(500).json({ message: error.messa`Invalid token${error.message}` });
    }
}

module.exports = {
    checkCurrentUserToken
}