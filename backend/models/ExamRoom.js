const mongoose = require('mongoose')

const ExamRoom = new mongoose.Schema({
    name: String,
    address: String,
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
    total_seat: String,
    available_seat: String,
})

module.exports = mongoose.model('rooms', ExamRoom)