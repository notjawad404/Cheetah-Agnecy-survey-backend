const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    progress: {
      step1: { type: String },
      step2: {
        comfort: { type: Number },
        looks: { type: Number },
        price: { type: Number }
      }
    },
    status: { type: String, default: 'in-progress' },
    step: { type: Number, default: 1 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Survey', surveySchema);
