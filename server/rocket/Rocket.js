const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Rocket = mongoose.Schema({
    title: { type: String, required: true },
    twoDay: { type: ObjectId, ref: 'Question', required: true },
    twoWeek: { type: ObjectId, ref: 'Question', required: true },
    twoMonth: { type: ObjectId, ref: 'Question', required: true },
});

module.exports = mongoose.model('Rocket', Rocket);

// let x = {
//     td: {
//         explanation: 'Review for Twoays after Moises Rocket',
//         question: '',
//         choices: [
//             { text: 'Answer 1' },
//             { text: 'Answer 2' },
//             { text: 'Third' },
//             { text: 'FourthMoises Rocket' },
//         ],
//         correct: 'Answer 1',
//     },
//     tw: {
//         explanation: 'Review for Two Dayfter Moises Rocket',
//         question: 'First',
//         choices: [
//             { text: 'Second' },
//             { text: 'Answer 2' },
//             { text: 'Third' },
//             { text: 'FourthMoises Rocket' },
//         ],
//         correct: 'Second',
//     },
//     tm: {
//         explanation: 'Review for Twoays after Moises Rocket',
//         question: 'First',
//         choices: [
//             { text: 'Second' },
//             { text: 'Answer 2' },
//             { text: 'Third' },
//             { text: 'FourthMoises Rocket' },
//         ],
//         correct: 'Second',
//     },
//     title: 'Test Rocket',
// };
