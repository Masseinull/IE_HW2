const mongoose = require('mongoose');

const regCourseSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        unique: true,
        ref: 'term',
        validate: {
            validator: async function(value) {
                const term = await mongoose.model('term').findOne({_id: value});
                return !!term;
            },
            message: 'Error: 406 (Invalid term)',
        }
    },
    semester_courses: [{
        course: {
          type: String,
          ref: 'semesterCourse._id',
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