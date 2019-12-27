const ExamSemester = require('../models/ExamSemester')
const mongoose = require('mongoose')

exports.getAllSemesters = async (req, res, err) => {
    const result = await ExamSemester.find().populate('shifts').lean()

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy'
    })

    return res.status(200).json({
        message: 'Thành công',
        result
    })
}

exports.getSemester = async (req, res, err) => {
    const result = await ExamSemester.findOne({
        _id: mongoose.Types.ObjectId(req.params.uuid)
    })
    .populate('shifts')
    .lean()

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy'
    })

    return res.status(200).json({
        message: 'Thành công',
        result
    })
}

exports.createSemester = async (req, res, err) => {
    const result = await ExamSemester.create({
        year: req.body.year,
        semester: req.body.semester,
        shifts: []
    })

    if (!result) return res.status(500).json({
        message: 'Có lỗi xảy ra'
    })

    return res.status(200).json({
        message: 'Thành công'
    })
}

// exports.updateSemester = async (req, res, err) => {
    // const result = await ExamSemester.findOne({
    //     _id: mongoose.Types.ObjectId(req.params.uuid)
    // })
    // .populate('shifts')
    // .lean()


// }



