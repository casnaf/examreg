const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    // uuid: String,
    fullname: String,
    student_code: String,
    vnu_email: String,
    class_code: String,
    birth_date: String,
    class_name: String,
    note: String
})

module.exports = mongoose.model('student', Student)