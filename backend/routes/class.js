const express = require('express')
const router = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const tmp = file.originalname.split('.')   
        if(tmp[tmp.length-1] !== 'xlsx') {
            return cb(new Error('Invalid file type'))
        }
        return cb(null, true)
    }
})

const classController = require('../controllers/class')

router.post('/add-class', upload.single('file'), classController.addClass)
router.get('/:uuid', classController.getClass)

module.exports = router