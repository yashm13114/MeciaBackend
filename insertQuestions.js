// insertQuestions.js
const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb+srv://yashm13114:sh5VlCTZNnkShVVP@cluster0.lgqyj4p.mongodb.net/MCQque', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    const questions = [{
            questionText: 'Which of the following general topics do you enjoy?',
            options: {
                a: 'Technology',
                b: 'Arts',
                c: 'Science',
                d: 'Business'
            },
            category: 'general'
        },
        {
            questionText: 'What interests you in Technology?',
            options: {
                a: 'Programming',
                b: 'AI',
                c: 'Cybersecurity',
                d: 'Gadgets'
            },
            category: 'technology'
        },
        // Add more questions for arts, science, business, etc.
    ];

    Question.insertMany(questions).then(() => {
        console.log('Questions inserted');
        mongoose.connection.close();
    }).catch(err => console.log(err));
}).catch(err => console.log(err));