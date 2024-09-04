const pdf = require('pdf-parse');
const fs = require('fs');

const pdfPath = './questions.pdf';
let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    // Extract text from PDF
    console.log(data.text);
    // You would then need to parse this text and extract the questions and options
});