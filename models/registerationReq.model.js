const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')

const regReqSchema = new mongoose.Schema({
    requesterId: {
        type: Number,
        ref: 'student'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'regCourse'
      }]
});
const regReq = mongoose.model('regReq', regReqSchema);
module.exports = regReq;