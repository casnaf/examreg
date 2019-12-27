const express = require('express')
const router = express.Router()

const examRoom = require('../controllers/examRoom')

router.post('/create-exam-room', examRoom.createExamRoom)

module.exports = router