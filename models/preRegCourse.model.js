const mongoose = require('mongoose');

const preRegCourseSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        unique: true,
        ref: 'term',
        validate: {
            validator: async function (value) {
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
        requests: {
            type: Number,
            default: 0,
        },
    }],
});
const preRegCourse = mongoose.model('preRegCourse', preRegCourseSchema);
module.exports = preRegCourse;