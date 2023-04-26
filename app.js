// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// routes
const checkout = require('./routes/checkout');  //use this when implementing routes

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Hello world!'));

// The checkout route
app.use('/api/checkout', checkout);

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, '/client/build')))
   .listen(PORT, () => console.log(`Listening on ${PORT}`));