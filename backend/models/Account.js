
const mongoose = require('mongoose')

const Account = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    role: String
})

module.exports = mongoose.model('account', Account)