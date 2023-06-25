const mongoose = require('mongoose');
const semesterCourse = require('./semester_course.model')

const preRegReqSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term',
        validate: {
            validator: function(value) {
                // Check if value is a 4-digit number
                if (value < 1000 || value > 9999) {
                    return false;
                }
                // Check if last digit is 1, 2, or 3
                const lastDigit = value % 10;
                if (lastDigit !== 1 && lastDigit !== 2 && lastDigit !== 3) {
                    return false;
                }
                return true;
            },
            message: 'Error: 406 (Invalid term id)',
        }
    },
    requesterId: {
        type: Number,
        ref: 'student'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'preRegCourse'
      }]
});
const preRegReq = mongoose.model('preRegReq', preRegReqSchema);
module.exports = preRegReq;