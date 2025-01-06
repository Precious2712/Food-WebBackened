require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

const testRequest = require('./src/route/request');
const signup = require('./src/route/auth');
const pass = require('./src/route/food');
const paths = require('./src/route/stores')
const cart = require('./src/route/cart');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

app.use('/api/v1', testRequest);
app.use('/api/v2', signup);
app.use('/api/v3', pass);
app.use('/api/v4', cart);
app.use('/api/v1', paths);

const port = 2000

function kick() {
    try {
        const connect = mongoose.connect(process.env.mongooseBaseUrl)
        app.listen(port, 'localhost', () => {
            if (connect) {
                console.log(`Server is running on port ${port}`);
                console.log('Connected to port ${port}');
            }
        });
    } catch (error) {
        console.log(error);

    }
}
kick();


