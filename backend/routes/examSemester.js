const express = require('express')
const router = express.Router()

const examSemester = require('../controllers/examSemester')

router.get('/', examSemester.getAllSemesters)
router.get('/:uuid', examSemester.getSemester)
router.post('/', examSemester.createSemester)

module.exports = router