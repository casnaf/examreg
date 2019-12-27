const express = require('express')
const router = express.Router()

const examShift = require('../controllers/examShift')

router.get('/all', examShift.getAllExamShifts)
router.post('/create', examShift.createExamShift)
router.get('/:uuid', examShift.getExamShift)
//router.patch('/:uuid', examShift.editExamShift)
router.delete('/:uuid', examShift.deleteExamShift)

module.exports = router