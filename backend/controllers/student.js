const Student = require('../models/Student');
// const ModuleClass = require('../models/ModuleClass');
const Account = require('../models/Account');
// const StudentModuleClass = require('../models/StudentModuleClass');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

exports.getAllStudents = async (req, res, err) => {
    const result = await Student.find().select('-_id').lean()

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy sinh viên'
    })

    return res.status(200).json({
        message: 'Tìm kiếm thành công',
        result
    })
}

exports.getStudent = async (req, res, err) => {
    const result = await Student.findOne({
        uuid: req.params.uuid
    })
    .select('-_id')
    .lean()

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy sinh viên'
    })
    
    return res.status(200).json({
        message: 'Tìm kiếm thành công',
        result
    })
}

exports.deleteStudent = async (req, res, err) => {
    const deletedStudent = await Student.deleteOne({
        uuid: req.params.uuid
    })

    const deletedAccount = await Account.deleteOne({
        uuid: req.params.uuid
    })

    if (deletedStudent.deletedCount === 0) return res.status(404).json({
        error: 'Not found',
        message: 'Không tìm thấy sinh viên'
    })

    return res.status(200).json({
        message: 'Xóa thành công'
    })
} 

exports.editStudent = async (req, res, err) => {
    const result = await Student.updateOne({
        uuid: req.params.uuid,
    }, {
        // student_code: req.body.student_code,
        fullname: req.body.fullname,
        birth_date: req.body.birth_date,
        class_name: req.body.class_name,
        class_code: req.body.class_code,
        vnu_email: req.body.vnu_email,
        note: req.body.note
    })

    if (result.n === 0) return res.status(404).json({
        error: 'Not matched any items',
        message: 'Không tìm thấy sinh viên'
    })
    
    return res.status(200).json({
        message: 'Cập nhật thành công'
    })
}

exports.addStudentAccounts = (req, res, err) => {
    const query = Student.find().select('uuid student_code').lean().exec()
    query
    .then(async students => {
        for (const student of students) {
            console.log(student.uuid)
            console.log(student.student_code)
            
            const result = await Account.findOne({uuid: student.uuid}).lean()
            if (!result) {
                bcrypt.hash(student.student_code, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: 'Có lỗi xảy ra'
                        })
                    }
    
                    Account.create({
                        uuid: student.uuid,
                        username: student.student_code,
                        password: hash,
                        role: 'student'
                    })
                })
            }
        }

        return res.status(200).json({
            message: 'Cấp tài khoản sinh viên thành công'
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err,
            message: 'Có lỗi xảy ra'
        })
    })
}