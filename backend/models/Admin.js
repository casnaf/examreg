const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    uuid: String,
    fullname: String,
    email: String,
    vnu_email: String,
    phone_number: String,
    note: String
})

module.exports = mongoose.model('admin', Admin)