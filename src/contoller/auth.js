require("dotenv").config();

const people = require('../model/auth');
const { UsersZodSchema } = require('../utility/ZodSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

const signUpUser = async (req, res) => {
    let { userName, email, password, address } = req.body;

    try {
        let validate = UsersZodSchema.parse({
            userName,
            email,
            password,
            address
        })

        const salt = await bcrypt.genSalt();

        validate.password = await bcrypt.hash(password, salt);
        // console.log(validate.password);

        const userData = await people.create(validate);

        res.status(201).json({
            message: 'user created successfully',
            data: userData
        })

        console.log('data created:', userData);

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: `error: ${error}`
        })
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(404).json({ message: "pls fill all the details" });
    }

    const electronicMail = await people.findOne({ email: email });

    if (!electronicMail) {
        return res.status(404).json({
            message: 'user not found'
        });
    }

    const verifyPassword = await bcrypt.compare(password, electronicMail.password);

    if (!verifyPassword) {
        return res.status(404).json({
            message: 'user not found'
        });
    }

    const token = createToken(electronicMail._id)

    res.status(201).json({
        message: 'user login successfully',
        data: electronicMail._id,
        tokenIn: token
    })
}

const currentUser = async (req, res) => {
    try {
        const endUser = await people.findById(req.user)

        if (!endUser) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        res.status(201).json({
            message: 'user login successfully',
            data: endUser
        })

    } catch (error) {
        return res.status(500).json({
            message: `error: ${error}`
        })
    }
}

module.exports = {
    signUpUser,
    loginUser,
    currentUser
}