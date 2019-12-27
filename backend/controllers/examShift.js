const ExamShift = require('../models/ExamShift')


exports.createExamShift = async (req, res, err) => {
    const result = await ExamShift.create({
        exam_date: req.body.exam_date,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    })

    if (!result) return res.status(500).json({
        message: 'Failed'
    })

    return res.status(200).json({
        message: 'Ok'
    })
}

exports.getAllExamShifts = async (req, res, err) => {
    const result = await ExamShift.find().populate('rooms').lean()

    if (!result) return res.status(404).json({
        message: 'Not Found'
    })

    return res.status(200).json({
        message: 'Ok',
        result
    })
}

exports.getExamShift = async (req, res, err) => {
    const result = await ExamShift.find({
        _id: req.params.uuid
    })
    .populate('rooms')
    .lean()

    if (!result) return res.status(404).json({
        message: 'Not found'
    })

    return res.status(200).json({
        message: 'Ok',
        result
    })
}

exports.editExamShift = async (req, res, err) => {
    const result = ExamShift.findByIdAndUpdate(
        req.params.uuid,
        { $set: { ...req.body } },
        { new: true, upsert: true },
        (err, res) => {
            if (err) return res.status(500).json({
                message: 'Error'
            })

            return res.status(200).json({
                message: 'Ok',
                result: res
            })
        }
    )

    console.log(result)

    return res.status(200).json({
        message: 'Ok'
    })
}

exports.deleteExamShift = async (req, res, err) => {
    const result = await ExamShift.deleteOne({
        _id: req.params.uuid
    }, (err) => {
        if (err) return res.status(500).json({
            message: 'Error'
        })
    })

    return res.status(200).json({
        message: 'Ok'
    })
}