const mongoose = require('mongoose')

const Class = new mongoose.Schema({
    code: String,
    lecturer_name: String,
    number_of_credits: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
    available_students: Array
})

module.exports = mongoose.model('classes', Class)