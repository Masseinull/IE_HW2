const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')

const preRegReqSchema = new mongoose.Schema({
    requesterId: {
        type: Number,
        ref: 'student'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourse'
      }]
});
const preRegReq = mongoose.model('preRegReq', preRegReqSchema);
module.exports = preRegReq;