const express = require('express')
const router = express.Router()

const courseController = require('../controllers/course')


router.get('/', courseController.getAllCourse)
router.get('/:uuid', courseController.getCourse)
router.post('/:uuid', courseController.editCourse)


module.exports = router