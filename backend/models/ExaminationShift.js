// const Sequelize = require('sequelize')
// const connection = require('../database/connection')
// const ExaminationRoom = require('./ExaminationRoom')
// const ExaminationShiftExaminationRoom = require('./ExaminationShiftExaminationRoom')
// const ExaminationShift = connection.sequelize.define(
//     'examination_shift',
//     {
//         uuid: {
//             type: Sequelize.UUID,
//             primaryKey: true
//         },
//         examination_date: {
//             type: Sequelize.DATEONLY
//         },
//         start_time: {
//             type: Sequelize.TIME
//         },
//         end_time: {
//             type: Sequelize.TIME
//         }
//     }
// )

// ExaminationShift.belongsToMany(ExaminationRoom, {through: ExaminationShiftExaminationRoom})
// ExaminationRoom.belongsToMany(ExaminationShift, {through: ExaminationShiftExaminationRoom})



// module.exports = ExaminationShift

const mongoose = require('mongoose')

const ExamShift = new mongoose.Schema({
    uuid: String,
    exam_date: String,
    start_time: String,
    end_time: String
})

module.exports = mongoose.model('examshift', ExamShift)