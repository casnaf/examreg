const mongoose = require('mongoose')

const ExamSemester = new mongoose.Schema({
    year: String,
    semester: String,
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shifts' }],
})

module.exports = mongoose.model('semesters', ExamSemester)