const mongoose = require('mongoose');

const preRegCourseSchema = new mongoose.Schema({
    term_id: {
      type: Number,
      ref: 'term'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourse'
    }],
});
const preRegCourse = mongoose.model('preRegCourse', preRegCourseSchema);
module.exports = preRegCourse;