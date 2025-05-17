require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const testRequest = require('./src/route/request');
const signup = require('./src/route/auth');
const pass = require('./src/route/food');
const paths = require('./src/route/stores')
const cart = require('./src/route/cart');
const updates = require('./src/route/quantity')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', testRequest);
app.use('/api/v2', signup);
app.use('/api/v3', pass);
app.use('/api/v4', cart);
app.use('/api/v1', paths);
app.use('/api/v2', updates);

const port = 2000

function kick() {
    app.listen(port, 'localhost', () => {
        const connect = mongoose.connect(process.env.mongooseBaseUrl);
        if (connect) {
            console.log(`Server is running on port ${port}`);
        }else{
            console.log('failed to connect to server');
        }
    });
}
kick();