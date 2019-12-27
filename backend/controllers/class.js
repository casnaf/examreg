// const uuid = require('uuid')
const exceljs = require('exceljs')
const Course = require('../models/Course')
const Class = require('../models/Class')
const Student = require('../models/Student')
const StudentModuleClass = require('../models/StudentModuleClass')
const mongoose = require('mongoose')


exports.addClass = (req, res, err) => {
    // đọc file excel: 8 dòng đầu là thông tin học phần và lớp học phần
    const wb = new exceljs.Workbook()
    wb.xlsx.readFile(req.file.path).then( async () => {
        const sheet = wb.getWorksheet(1)
        const temp = []
        for (let i = 1; i < 9; i++) {
            temp.push(sheet.getRow(i).getCell(2).value)
        }
        
        // danh sách sinh viên
        const studentList = [];
        sheet.eachRow(( row, rowNumber ) => {
            if(rowNumber > 10) { studentList.push(row.values.splice(2, 7)) }
        })
        for (let i = 0; i < studentList.length; i++) {
            const date = studentList[i][2];
            const birth_date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            studentList[i][2] = birth_date;
        }

        // tìm học phần
        const foundCourse = await Course.findOne({
            code: temp[1] //course.code
        })
        
        if (!foundCourse) {
            const [studentObjectIds, availableStudents] = await _insertStudent(studentList)            

            const classInsert = await Class.create({
                code: temp[5],
                number_of_credits: temp[6],
                lecturer_name: temp[7],
                students: studentObjectIds,
                available_students: availableStudents
            })

            const courseInsert = await Course.create({
                name: temp[0],
                code: temp[1],
                institute: temp[2],
                examine_method: temp[3],
                examine_time: temp[4],
                classes: [classInsert._id]
            })

            return res.status(200).json({
                message: 'Thành công'
            })
        } else {
            const foundClass = await Class.findOne({ code: temp[5] })
            if ( foundClass ) {
                return res.status(500).json({
                    message: 'Đã tồn tại lớp học phần này'
                })
            }
            
            console.log('update only')
            const [studentObjectIds, availableStudents] = await _insertStudent(studentList)            
            
            const classInsert = await Class.create({
                code: temp[5],
                number_of_credits: temp[6],
                lecturer_name: temp[7],
                students: studentObjectIds,
                available_students: availableStudents
            })

            const classes = foundCourse.classes
            classes.push(classInsert._id)
            const updateCourse = await Course.updateOne({
                code: temp[1] //course.code
            }, {
                classes: classes
            })

            return res.status(200).json({
                message: 'Thành công'
            })
        }
    })
}

const _insertStudent = async (studentList) => {
    const studentObjectIds = []
    const availableStudents = []
    let i = 0

    const allStudents = await Student.find().select('_id student_code').lean()
    const allStudentCode = allStudents.map(ele => ele.student_code)
    
    for (const student of studentList) {
        if (i === 2) break
        const student_code = student[0]
        const idx = allStudentCode.indexOf(student_code.toString())
        if ( idx >= 0 ) {
            const studentId = allStudents[idx]._id
            studentObjectIds.push(studentId)
        } else {
            const studentInsert = await Student.create({
                student_code: student_code,
                fullname: student[1],
                birth_date: student[2],
                class_code: student[3],
                class_name: student[4],
                vnu_email: student[0] + '@vnu.edu.vn',
                note: '',
            })
            studentObjectIds.push(studentInsert._id)

            const status = student[5]
            if (status === 1) {
                availableStudents.push(student_code)
            }
        }
        i++
    }
    return [studentObjectIds, availableStudents]
}

exports.getClass = async (req, res, err) => {
    const result = await Class.findOne({
        _id: mongoose.Types.ObjectId(req.params.uuid)
    })
    .populate('students')
    .lean()

    if (!result) return res.status(404).json({
        message: 'Không tìm thấy'
    })

    return res.status(200).json({
        message: 'Thành công',
        result
    })
}