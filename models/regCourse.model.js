const mongoose = require('mongoose');

const regCourseSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourse'
      }],
});
const regCourse = mongoose.model('regCourse', regCourseSchema);
module.exports = regCourse;