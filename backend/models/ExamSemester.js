const mongoose = require('mongoose')

const ExamSemester = new mongoose.Schema({
    year: String,
    semester: String,
    exam_shift: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exam_shifts' }],
})

module.exports = mongoose.model('exam_semesters', ExamSemester)