const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber: Number,
    questionText: String,
    options: {
        type: Map,
        of: String
    },
    correctAnswer: String,
    followUpQuestions: {
        type: Map,
        of: mongoose.Schema.Types.ObjectId
    },
    category: String // New field for question category
});

module.exports = mongoose.model('aptitudeque12', questionSchema);