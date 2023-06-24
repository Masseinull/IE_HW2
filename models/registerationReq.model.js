const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')

const regReqSchema = new mongoose.Schema({
    requesterId: Number ,
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourse'
      }]
});
const regReq = mongoose.model('regReq', regReqSchema);
module.exports = regReq;