
const mongoose = require('mongoose')

const Account = new mongoose.Schema({
    // uuid: String,
    username: String,
    password: String,
    role: String,
    // student: {type: mongoose.Types.ObjectId, ref='students'}
})

module.exports = mongoose.model('accounts', Account)