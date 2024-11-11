const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  progress: {
    step1: { type: String },
    step2: {
      Comfort: { type: Number },
      Looks: { type: Number },
      Price: { type: Number }
    }
  },
  status: { type: String, default: 'in-progress' }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);
