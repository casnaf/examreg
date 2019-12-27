const Student = require('../models/Student')
const Account = require('../models/Account')
const bcrypt = require('bcrypt')

exports.getAllStudents = async (req, res, err) => {
    const result = await Student.find().lean()

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
        student_code: req.params.uuid
    })
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
        student_code: req.params.uuid
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
        student_code: req.params.uuid,
    }, { ...req.body })

    if (result.n === 0) return res.status(404).json({
        error: 'Not matched any items',
        message: 'Không tìm thấy sinh viên'
    })
    
    return res.status(200).json({
        message: 'Cập nhật thành công'
    })
}

exports.addStudentAccounts = (req, res, err) => {
    const query = Student.find().select('_id student_code').lean().exec()

    query
    .then(async students => {
        for (const student of students) {
            
            const result = await Account.findOne({ username: student.student_code }).lean()
            if (!result) {
                bcrypt.hash(student.student_code, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: 'Có lỗi xảy ra'
                        })
                    }
    
                    Account.create({
                        username: student.student_code,
                        password: hash,
                        role: 'student',
                        // student: student._id
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