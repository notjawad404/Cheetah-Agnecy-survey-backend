const express = require('express');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const surveyRoutes = require('./routes/surveyRoutes');

dotenv.config();

const app = express();

// Enable CORS for your frontend's URL
app.use(cors({
  origin: 'http://localhost:3001', // Adjust if your frontend runs on a different port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', surveyRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

module.exports = app;
