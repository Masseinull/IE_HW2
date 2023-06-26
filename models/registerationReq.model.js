const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'regCourse'
      }],
    credits : {
        type: Number,
        max: 20
    }
});
const regReq = mongoose.model('regReq', regReqSchema);
module.exports = regReq;