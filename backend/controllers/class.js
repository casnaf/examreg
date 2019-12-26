const uuid = require('uuid')
const exceljs = require('exceljs')
const Course = require('../models/Course')
const Class = require('../models/Class')
const Student = require('../models/Student')
const StudentModuleClass = require('../models/StudentModuleClass')
const mongoose = require('mongoose')


exports.addClass = (req, res, err) => {
    // đọc file excel: 8 dòng đầu là thông tin học phần và lớp học phần
    console.log(req.file)
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
            console.log(1111)
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
    //     Course.findOne({ where: {course_code: course.course_code} })
    //     .then(doc => {
    //         // nếu chưa có học phần trong db: thêm mới học phần và lớp học phần
    //         if(!doc) {
    //             // thông tin lớp học phần
    //             const moduleClass = {
    //                 uuid: uuid(),
    //                 courseUuid: courseUuid,
    //                 module_class_code: temp[5],
    //                 number_of_credits: temp[6],
    //                 lecturer_name: temp[7]
    //             }

    //             Course.create(course).then(result => {
    //                 ModuleClass.create(moduleClass).then(mClass => {
    //                     for(var i = 0 ; i < studentList.length ; i++) {
    //                         const studentUuid = uuid();
    //                         const student = {
    //                             uuid: studentUuid,
    //                             fullname: studentList[i][1],
    //                             student_code: studentList[i][0],
    //                             birth_date: studentList[i][2],
    //                             class_code: studentList[i][4],
    //                             class_name: studentList[i][3],
    //                             vnu_mail: studentList[i][0] + '@vnu.edu.com'
    //                         }
    //                         const status = studentList[i][5];
    //                         Student.findOne({ where: {student_code: student.student_code} })
    //                         .then(stu => {
    //                             if(stu) {
    //                                 StudentModuleClass.create({
    //                                     studentUuid: stu.uuid,
    //                                     moduleClassUuid: mClass.uuid,
    //                                     status: status
    //                                 })
    //                                 .catch(error => {
    //                                     res.status(409).json({
    //                                         error: error,
    //                                         message: 'Có lỗi xảy ra'
    //                                     })
    //                                 });
    //                             }
    //                             else {
    //                                 Student.create(student).then(newStu => {
    //                                     StudentModuleClass.create({
    //                                         studentUuid: newStu.uuid,
    //                                         moduleClassUuid: mClass.uuid,
    //                                         status: status
    //                                     });
    //                                 })
    //                                 .catch(error => {
    //                                     res.status(409).json({
    //                                         error: error,
    //                                         message: 'Có lỗi xảy ra'
    //                                     })
    //                                 });;                                    
    //                             }
    //                         });
    //                     }
    //                 });
    //                 res.status(201).json({
    //                     message: 'Thêm lớp học phần thành công'
    //                 });
    //             }).catch(error => {
    //                 res.status(409).json({
    //                     error: error,
    //                     message: 'Có lỗi xảy ra'
    //                 })
    //             });
    //         }
    //         // nếu đã tồn tạo học phần: chỉ thêm lớp học phần
    //         else {
    //             // thông tin học phần
    //             // nếu lớp học phần đã tồn tại: báo lỗi
    //             const moduleClass = {
    //                 uuid: uuid(),
    //                 courseUuid: doc.uuid,
    //                 module_class_code: temp[5],
    //                 number_of_credits: temp[6],
    //                 lecturer_name: temp[7]
    //             }
    //             ModuleClass.create(moduleClass).then(mClass => {
    //                 for(var i = 0 ; i < studentList.length ; i++) {
    //                     const studentUuid = uuid();
    //                     const student = {
    //                         uuid: studentUuid,
    //                         fullname: studentList[i][1],
    //                         student_code: studentList[i][0],
    //                         birth_date: studentList[i][2],
    //                         class_code: studentList[i][4],
    //                         class_name: studentList[i][3],
    //                         vnu_mail: studentList[i][0] + '@vnu.edu.com'
    //                     }
    //                     const status = studentList[i][5];
    //                     Student.findOne({ where: {student_code: student.student_code} })
    //                     .then(stu => {
    //                         if(stu) {
    //                             StudentModuleClass.create({
    //                                 studentUuid: stu.uuid,
    //                                 moduleClassUuid: mClass.uuid,
    //                                 status: status
    //                             }).catch(error => {
    //                                 res.status(409).json({
    //                                     error: error,
    //                                     message: 'Có lỗi xảy ra'
    //                                 })
    //                             });
    //                         }
    //                         else {
    //                             Student.create(student).then(newStu => {
    //                                 StudentModuleClass.create({
    //                                     studentUuid: newStu.uuid,
    //                                     moduleClassUuid: mClass.uuid,
    //                                     status: status
    //                                 });
    //                             })
    //                             .catch(error => {
    //                                 res.status(409).json({
    //                                     error: error,
    //                                     message: 'Có lỗi xảy ra'
    //                                 })
    //                             });                                    
    //                         }
    //                     });
    //                 }
    //                 res.status(201).json({
    //                     message: 'Thêm lớp học phần thành công'
    //                 });
    //             }).catch(error => {
    //                 res.status(409).json({
    //                     error: error,
    //                     message: 'Lớp học phần đã tồn tại'
    //                 })
    //             });
    //         }
    //     })
        
    // })
    // .catch(error => {
    //     res.status(500).json({
    //         error: error,
    //         message: 'Có lỗi xảy ra'
    //     })
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

exports.getClass = (req, res, next) => {
    ModuleClass.findOne({
        attributes: ['uuid', 'module_class_code', 'number_of_credits', 'lecturer_name', 'courseUuid'], 
        where:{uuid: req.params.module_class_uuid},
        include: [{
            model: Student,
            attributes: ['uuid', 'fullname', 'student_code', 'class_name', 'birth_date', 'class_code'],
            through: {
                model: StudentModuleClass,
                as: 'condition',
                attributes: ['status']
            }
        }] 
    })
    .then(result => {
        if(!result) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        else {
            return res.status(200).json({
                result: result
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error,
            message: 'Có lỗi xảy ra'
        })
    })
}