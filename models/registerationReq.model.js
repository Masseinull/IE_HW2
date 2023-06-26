const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')
const { checkForClassTimingConflicts, checkForExamTimingConflicts } = require('../timing');

const regReqSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term',
        validate: {
            validator: async function(value) {
                const term = await mongoose.model('term').findOne({_id: value});
                return !!term;
            },
            message: 'Error: 406 (Invalid term)',
        }
    },
    requesterId: {
        type: Number,
        ref: 'student',
        validate: {
            validator: async function(value) {
                const student = await mongoose.model('student').findOne({_id: value});
                return !!student;
            },
            message: 'Error: 406 (Invalid student)',
        }
    },
    semester_courses: [{
        type: String,
        ref: 'regCourse.semester_courses.course._id',
        validate: {
            validator: async function (value) {
              const course = await mongoose.model('semester_course').findOne({ _id: value });
              if (!checkForClassTimingConflicts(course, this.semester_courses)) {
                return false; 
              }
    
              if (!checkForExamTimingConflicts(course, this.semester_courses)) {
                return false; 
              }
    
    
              return true;
            },
            message: "course class/exam timing conflict",
          },
      }],
    credits : {
        type: Number,
        max: 20
    }
});
const regReq = mongoose.model('regReq', regReqSchema);
module.exports = regReq;