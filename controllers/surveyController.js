const Survey = require('../models/Survey');

// Store survey
const storeSurvey = async (req, res) => {
    const { email, progress, status } = req.body;

    try {
        // Check if survey already exists for this email
        const existingSurvey = await Survey.findOne({ email });
        if (existingSurvey) {
            return res.status(200).json({ message: "Survey already exists for this email." });
        }

        // Create a new survey with nested progress fields
        const newSurvey = new Survey({
            email,
            step1: progress?.step1,
            step2: progress?.step2,
            status
        });

        const savedSurvey = await newSurvey.save();
        res.status(201).json(savedSurvey);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get survey by email
const getSurveyByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const survey = await Survey.findOne({ email });

        if (!survey) {
            return res.status(200).json({ message: "No survey data found for this email." });
        }

        res.json(survey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update survey
const updateSurvey = async (req, res) => {
    const { email } = req.params;
    const { progress, status } = req.body;

    try {
        const updatedSurvey = await Survey.findOneAndUpdate(
            { email },
            {
                ...(progress?.step1 && { step1: progress.step1 }),
                ...(progress?.step2 && { step2: progress.step2 }),
                ...(status && { status })
            },
            { new: true, runValidators: true }
        );

        if (!updatedSurvey) {
            return res.status(200).json({ message: "No survey found for this email, no updates made." });
        }

        res.json(updatedSurvey);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { storeSurvey, updateSurvey, getSurveyByEmail };
