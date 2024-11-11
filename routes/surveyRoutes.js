const express = require('express');
const { storeSurvey, updateSurvey, getSurveyByEmail } = require('../controllers/surveyController');
const router = express.Router();

// Route to store survey
router.post('/survey', storeSurvey);

// Route to get survey by email
router.get('/survey/:email', getSurveyByEmail);

// Route to update survey by email
router.put('/survey/:email', updateSurvey);

module.exports = router;
