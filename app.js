const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Question = require('./models/questionSchema'); // Adjust path if necessary
const authRouter = require('./routes/authRouter');

const app = express();
// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for frontend requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://yashm13114:sh5VlCTZNnkShVVP@cluster0.lgqyj4p.mongodb.net/MCQque', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use('/auth', authRouter);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST,,PUT, PATCH, DELETE");
    next();
});
app.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});
// Array of questions to insert
const questions = [{
        questionNumber: 1,
        questionText: 'Which of the following general topics do you enjoy or feel drawn to?',
        options: {
            a: 'Technology (e.g., gadgets, coding, AI)',
            b: 'Arts and Literature (e.g., painting, writing, music)',
            c: 'Science and Engineering (e.g., physics, engineering, biology)',
            d: 'Business and Finance (e.g., entrepreneurship, pesonal, marketing)',
            e: 'Social Sciences (e.g., psychology, history, sociology)',
            f: 'Health and Wellness (e.g., fitness, mental health, nutrition)',
            g: 'Other (Specify)',
            h: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            h: null, // Placeholder for follow-up question ID for "I'm not sure"
            a: null, // Placeholder for follow-up question ID for "Technology"
            b: null, // Placeholder for follow-up question ID for "Arts and Literature"
            c: null, // Placeholder for follow-up question ID for "Science and Engineering"
            d: null, // Placeholder for follow-up question ID for "Business and Finance"
            e: null, // Placeholder for follow-up question ID for "Social Sciences"
            f: null, // Placeholder for follow-up question ID for "Health and Wellness"
            g: null // Placeholder for follow-up question ID for "Other"
        }
    },
    {
        questionNumber: 2,
        questionText: 'Which of these do you spend most of your free time on?',
        options: {
            a: 'Using or exploring new technology',
            b: 'Reading or consuming arts and literature',
            c: 'Watching science documentaries or engaging in experiments',
            d: 'Following the stock market or business news',
            e: 'Reading about social issues or history',
            f: 'Exercising, eating healthy, or learning about wellness',
            g: 'None of the above'
        },
        correctAnswer: null,
        followUpQuestions: {
            g: null // Placeholder for follow-up question ID for "None of the above"
        }
    },
    {
        questionNumber: 3,
        questionText: 'What do you usually do in your free time?',
        options: {
            a: 'Open-ended response' // This would be handled differently in an actual application
        },
        correctAnswer: null
    },
    {
        questionNumber: 4,
        questionText: 'Within Technology, what specifically interests you?',
        options: {
            a: 'Programming/Coding',
            b: 'Emerging Technologies (e.g., AI, Blockchain)',
            c: 'Gadgets/Consumer Electronics',
            d: 'Cybersecurity',
            e: 'Tech News/Trends',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for follow-up question ID for "I'm not sure"
        }
    },
    {
        questionNumber: 5,
        questionText: 'Would you like to explore more about:',
        options: {
            a: 'How technology is evolving?',
            b: 'Learning to code?',
            c: 'How technology affects everyday life?',
            d: 'How to protect your privacy online?'
        },
        correctAnswer: null
    },
    {
        questionNumber: 6,
        questionText: 'Within Arts and Literature, what specifically interests you?',
        options: {
            a: 'Visual Arts (e.g., painting, sculpture)',
            b: 'Writing and Literature (e.g., fiction, poetry)',
            c: 'Music (e.g., playing instruments, composing)',
            d: 'Performing Arts (e.g., theater, dance)',
            e: 'Art History and Criticism',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for follow-up question ID for "I'm not sure"
        }
    },
    {
        questionNumber: 7,
        questionText: 'Would you like to explore more about:',
        options: {
            a: 'Creating your own art or writing?',
            b: 'Understanding the history and evolution of art or literature?',
            c: 'How art and literature influence culture and society?',
            d: 'Learning to appreciate different forms of music and performance?'
        },
        correctAnswer: null
    },
    {
        questionNumber: 8,
        questionText: 'Within Science and Engineering, what specifically interests you?',
        options: {
            a: 'Physics and Astronomy',
            b: 'Chemistry and Materials Science',
            c: 'Biology and Life Sciences',
            d: 'Engineering and Robotics',
            e: 'Environmental Science',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for follow-up question ID for "I'm not sure"
        }
    },
    {
        questionNumber: 9,
        questionText: 'Would you like to explore more about:',
        options: {
            a: 'Understanding the fundamental principles of science?',
            b: 'How scientific discoveries impact everyday life?',
            c: 'Learning about the latest innovations in engineering?',
            d: 'Exploring the relationship between technology and the environment?'
        },
        correctAnswer: null
    },
    {
        questionNumber: 10,
        questionText: 'Within Business and Finance, what specifically interests you?',
        options: {
            a: 'Entrepreneurship and Startups',
            b: 'Investing and Stock Markets',
            c: 'Marketing and Branding',
            d: 'Economics and Economic Policy',
            e: 'Corporate Management and Leadership',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for follow-up question ID for "I'm not sure"
        }
    },
    {
        questionNumber: 11,
        questionText: 'Would you like to explore more about:',
        options: {
            a: 'Starting and running a business?',
            b: 'How to manage personal finances and investments?',
            c: 'Understanding economic trends and policies?',
            d: 'The impact of marketing on consumer behavior?'
        },
        correctAnswer: null
    },
    {
        questionNumber: 12,
        questionText: 'Within Social Sciences, what specifically interests you?',
        options: {
            a: 'Psychology and Human Behavior',
            b: 'Sociology and Social Issues',
            c: 'History and Cultural Studies',
            d: 'Political Science and Governance',
            e: 'Anthropology and Human Evolution',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for "I'm not sure" follow-up
        }
    },
    {
        questionNumber: 13,
        questionText: 'If "I\'m not sure" is selected, would you like to explore more about:',
        options: {
            a: 'Understanding why people behave the way they do?',
            b: 'The history and development of societies?',
            c: 'How political systems shape societies?',
            d: 'The impact of culture on human development?'
        },
        correctAnswer: null
    },
    {
        questionNumber: 14,
        questionText: 'Within Health and Wellness, what specifically interests you?',
        options: {
            a: 'Physical Fitness and Exercise',
            b: 'Nutrition and Diet',
            c: 'Mental Health and Well-being',
            d: 'Preventive Health and Lifestyle Medicine',
            e: 'Alternative and Holistic Medicine',
            f: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            f: null // Placeholder for "I'm not sure" follow-up
        }
    },
    {
        questionNumber: 15,
        questionText: 'Would you like to explore more about:',
        options: {
            a: 'How to maintain a healthy lifestyle?',
            b: 'The connection between diet and overall health?',
            c: 'Understanding mental health and coping strategies?',
            d: 'The benefits of alternative medicine practices?'
        },
        correctAnswer: null
    },

    // Question 4 (Determining Expertise Levels)
    {
        questionNumber: 16,
        questionText: 'Would you prefer resources that are:',
        options: {
            a: 'Beginner-friendly',
            b: 'Intermediate',
            c: 'Advanced',
            d: "I'm not sure"
        },
        correctAnswer: null,
        followUpQuestions: {
            d: null
        }
    },

    // Follow-up for "I'm not sure" in Expertise Levels
    {
        questionNumber: 17,
        questionText: 'How often do you engage with this interest?',
        options: {
            a: 'Daily',
            b: 'Weekly',
            c: 'Occasionally',
            d: 'Rarely',
            e: 'Never'
        },
        correctAnswer: null
    },

    // Aptitude Test
    {
        questionNumber: 18,
        questionText: 'How comfortable do you feel when discussing or reading about [chosen topic]?',
        options: {
            a: 'Very comfortable—I can easily follow and contribute to conversations.',
            b: 'Somewhat comfortable—I understand most of the content but sometimes need clarification.',
            c: 'Not very comfortable—I often need help to grasp the concepts.',
            d: 'Uncomfortable—I usually avoid discussing or reading about it.'
        },
        correctAnswer: null
    },
    {
        questionNumber: 19,
        questionText: 'How often do you seek out information or updates related to [chosen topic]?',
        options: {
            a: 'Regularly—I keep up with the latest news and developments.',
            b: 'Occasionally—I check in on it when something catches my attention.',
            c: 'Rarely—I only look into it if it\'s necessary or someone else brings it up.',
            d: 'Never—I don\'t actively seek out information on this topic.'
        },
        correctAnswer: null
    },
    {
        questionNumber: 20,
        questionText: 'When you encounter a problem or challenge related to [chosen topic], how do you typically respond?',
        options: {
            a: 'I can usually solve it on my own or with minimal help.',
            b: 'I try to solve it but often need guidance or resources.',
            c: 'I rely heavily on others for help or need detailed instructions.',
            d: 'I avoid dealing with it if possible.'
        },
        correctAnswer: null
    },
    {
        questionNumber: 21,
        questionText: 'If you were asked to explain a concept within [chosen topic] to someone else, how confident would you feel?',
        options: {
            a: 'Very confident—I could explain it clearly and accurately.',
            b: 'Somewhat confident—I could explain it, but might struggle with details.',
            c: 'Not very confident—I would need to review or look up information first.',
            d: 'Not confident at all—I wouldn\'t know where to start.'
        },
        correctAnswer: null
    },
    {
        questionNumber: 22,
        questionText: 'Have you ever completed any projects, assignments, or activities related to [chosen topic]?',
        options: {
            a: 'Yes, and they were successful.',
            b: 'Yes, but I needed help or didn’t finish.',
            c: 'I’ve started but never completed any.',
            d: 'No, I’ve never attempted any.'
        },
        correctAnswer: null
    }
];

// API to fetch questions by category
app.get('/questions/:category', async(req, res) => {
    const category = req.params.category;
    const questions = await Question.find({ category });
    res.json(questions);
});

// API to handle submission
app.post('/submit-test', (req, res) => {
    const { userId, answers } = req.body;
    // Process the answers and save results
    console.log('User ID:', userId, 'Answers:', answers);
    res.json({ message: 'Test submitted successfully' });
});
// Function to insert questions into the database
async function insertQuestions() {
    try {
        // Fetch existing questions to avoid duplicates
        const existingQuestions = await Question.find({ questionNumber: { $in: questions.map(q => q.questionNumber) } });

        // Filter out questions that already exist
        const newQuestions = questions.filter(q => !existingQuestions.some(eq => eq.questionNumber === q.questionNumber));

        // Insert new questions
        if (newQuestions.length > 0) {
            await Question.insertMany(newQuestions);
            console.log('New questions inserted successfully');
        } else {
            console.log('No new questions to insert');
        }
    } catch (error) {
        console.error('Error inserting questions:', error);
    }
}


// Call the function to insert questions
insertQuestions();

// Endpoint to create a question
// app.post('/questions', async(req, res) => {
//     try {
//         const question = new Question(req.body);
//         await question.save();
//         res.status(201).send(question);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
app.post('/aptitudeque12', async(req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).send(question);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to get follow-up question based on selected option
app.post('/aptitudeque12/:id/follow-up', async(req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send({ message: 'Question not found' });
        }

        const selectedOption = req.body.selectedOption;
        const followUpQuestionId = question.followUpQuestions[selectedOption];
        if (followUpQuestionId) {
            const followUpQuestion = await Question.findById(followUpQuestionId);
            return res.status(200).send(followUpQuestion);
        }

        res.status(200).send({ message: 'No follow-up question available', question });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving follow-up question', error });
    }
});

// Endpoint to get all questions
app.get('/aptitudeque12', async(req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to get a specific question by ID
app.get('/aptitudeque12/:id', async(req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send({ message: 'Question not found' });
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving question', error });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});