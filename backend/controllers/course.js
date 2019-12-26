const Course = require('../models/Course')
const Class = require('../models/Class')


exports.getAllCourse = async (req, res, err) => {
    const result = await Course.find()
        .populate('classes')
        .lean()
        .limit(10)

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy'
    })

    return res.status(200).json({
        message: 'Thành công',
        result
    })
}

exports.getCourse = async (req, res, err) => {
    const result = await Course.findOne({ uuid: req.params.uuid })
        .populate('classes')
        .lean()
        .limit(10)

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy'
    })

    return res.status(200).json({
        message: 'Thành công',
        result
    })
}

exports.editCourse = async (req, res, err) => {
    const result = await Course.updateOne({ 
        uuid: req.params.uuid 
    }, {
        code: req.body.code,
        name: req.body.name,
        institute: req.body.institute,
        examine_method: req.body.examine_method,
        examine_time: req.body.examine_time
    })

    if (result.n === 0) return res.status(404).json({
        error: 'Not matched any items',
        message: 'Không tìm thấy sinh viên'
    })
    
    return res.status(200).json({
        message: 'Cập nhật thành công'
    })
}