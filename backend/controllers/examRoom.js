const ExamRoom = require('../models/ExamRoom')


exports.createExamRoom = async (req, res, err) => {
    const result = await ExamRoom.create({
        name: req.body.name,
        address: req.body.address,
        total_seat: req.body.total_seat,
        available_seat: req.body.total_seat
    })

    if (!result) return res.status(500).json({
        message: 'Ok'
    })

    return res.status(200).json({
        message: 'Ok'
    })
}