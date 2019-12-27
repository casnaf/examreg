const Course = require('../models/Course')
const Class = require('../models/Class')


exports.getAllCourse = async (req, res, err) => {
    const result = await Course.find()
        .populate({
            path: 'classes',
            populate: 'students'
        })
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
    const result = await Course.findOne({ code: req.params.uuid })
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
        code: req.params.uuid 
    }, { ...req.body })

    if (result.n === 0) return res.status(404).json({
        error: 'Not matched any items',
        message: 'Không tìm thấy sinh viên'
    })
    
    return res.status(200).json({
        message: 'Cập nhật thành công'
    })
}