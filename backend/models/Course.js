const mongoose = require('mongoose')

const Course = new mongoose.Schema({
    // uuid: String,
    code: String,
    name: String,
    institute: String,
    examine_method: String,
    examine_time: String,
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'classes' }]
})

module.exports = mongoose.model('course', Course)