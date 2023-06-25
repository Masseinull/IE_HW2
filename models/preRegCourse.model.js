const mongoose = require('mongoose');

const preRegCourseSchema = new mongoose.Schema({
    term_id: {
      type: Number,
      ref: 'term'
    },
    semester_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourse',
        validate: {
            validator: async function (value) {
                // Fetch the semesterCourse document
                const semesterCourse = await mongoose.model('semesterCourse').findOne({ _id: value });

                // Check if the term_number matches the term_id
                return semesterCourse && semesterCourse.semester === this.term_id;
            },
            message: 'Error: 406 (Invalid semesterCourse)',
        },
    }],
});
const preRegCourse = mongoose.model('preRegCourse', preRegCourseSchema);
module.exports = preRegCourse;