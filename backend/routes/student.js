const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student')

router.get('/', studentController.getAllStudents)
router.get('/:uuid', studentController.getStudent)
router.delete('/:uuid', studentController.deleteStudent)
router.patch('/:uuid', studentController.editStudent)
router.post('/add-student-accounts', studentController.addStudentAccounts)

module.exports = router