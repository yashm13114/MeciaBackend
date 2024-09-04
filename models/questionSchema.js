const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber: { type: Number, required: true },
    questionText: { type: String, required: true },
    options: { type: Map, of: String },
    correctAnswer: { type: String, default: null },
    followUpQuestions: { type: Map, of: mongoose.Schema.Types.ObjectId }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;