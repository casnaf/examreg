const mongoose = require('mongoose')

const ExamShift = new mongoose.Schema({
    exam_date: String,
    start_time: String,
    end_time: String,
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rooms' }]
})

module.exports = mongoose.model('shifts', ExamShift)