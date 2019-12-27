const mongoose = require('mongoose')
require('../models/ExamSemester')
require('../models/ExamRoom')
require('../models/ExamShift')
require('../models/Course')
require('../models/Account')
require('../models/Class')
require('../models/Admin')
require('../models/Student')

exports.connectDb = () => {
    const db_link = 'mongodb+srv://examreg:examreg123@test-vjpn7.gcp.mongodb.net/examreg?retryWrites=true&w=majority'
    mongoose.set('debug', true)
    mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
        console.log('database has been connected')
    })
}
