const mongoose = require('mongoose');

const regCourseSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term'
        // validate: {
        //     validator: function(value) {
        //         // Check if value is a 4-digit number
        //         if (value < 1000 || value > 9999) {
        //             return false;
        //         }
        //         // Check if last digit is 1, 2, or 3
        //         const lastDigit = value % 10;
        //         if (lastDigit !== 1 && lastDigit !== 2 && lastDigit !== 3) {
        //             return false;
        //         }
        //         return true;
        //     },
        //     message: 'Error: 406 (Invalid term id)',
        // }
    },
    semester_courses: [{
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'semesterCourse',
        },
        capacity: {
          type: Number,
          default: 0,
        },
        registered: {
            type: Number,
            validate: {
                validator: function(value) {
                    return value <= this.ge('capacity'); // Check if registered value is less than or equal to capacity
                },
                message: 'Registered value exceeds capacity',
            },
        }
      }],
});
const regCourse = mongoose.model('regCourse', regCourseSchema);
module.exports = regCourse;