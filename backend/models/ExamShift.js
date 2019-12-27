const mongoose = require('mongoose')

const ExamShift = new mongoose.Schema({
    exam_date: String,
    start_time: String,
    end_time: String,
    room: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exam_rooms' }],
})

module.exports = mongoose.model('exam_shifts', ExamShift)