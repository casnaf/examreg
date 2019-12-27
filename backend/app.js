const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const { connectDb } = require('./database/connection')
const accountRoutes = require('./routes/account')
const courseRoutes = require('./routes/course')
const classRoutes = require('./routes/class')
const studentRoutes = require('./routes/student')
const examSemesterRoutes = require('./routes/examSemester')
const examRoomRoutes = require('./routes/examRoom')
const examShiftRoutes = require('./routes/examShift')

connectDb()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use(morgan('common'))

app.use('/', accountRoutes)
app.use('/students', studentRoutes)
app.use('/courses', courseRoutes)
app.use('/courses/classes', classRoutes)
app.use('/exams', examSemesterRoutes)
app.use('/exams/shifts/rooms', examRoomRoutes)
app.use('/exams/shifts', examShiftRoutes)

app.use((req, res, err) => {
    const error = new Error('not found')
    error.status = 404
    err(error)
})

app.use((error, req, res, err) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app