require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const signup = require('./src/route/auth');
const pass = require('./src/route/food');
const paths = require('./src/route/stores');
const cart = require('./src/route/cart');
const updates = require('./src/route/quantity');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v2', signup);
app.use('/api/v3', pass);
app.use('/api/v4', cart);
app.use('/api/v1', paths);
app.use('/api/v2', updates);

const port = process.env.PORT || 2000;

async function kick() {
  try {
    await mongoose.connect(process.env.mongooseBaseUrl);
    console.log('Connected to MongoDB');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}

kick();