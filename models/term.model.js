const user = require('./user.model');
const Semester_course = require('./semester_course.model')
const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    term_name: {
        type: String ,
        unique : true,
    },
    users_id: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
            required: true,
            validate: {
                validator: async function(value) {
                    const users = await mongoose.model('user').find({ _id: { $in: value }, type: { $in: ['educationalManager', 'student', 'teacher'] } });
                    return !!users;
                },
                message: 'Error: 406 (Invalid user)',
        },
    },
    semester_courses:[{
        type: String,
        ref: 'semesterCourse',
        validate: {
            validator: async function (value) {
                // Fetch the semesterCourse document
                const semesterCourse = await mongoose.model('semesterCourse').findOne({ _id: value });
                if(semesterCourse){
                    return semesterCourse.semester === this.term_name;
                }
                // Check if the term_number matches the term_name
                return false;
            },
            message: 'Error: 406 (Invalid semesterCourse)',
        },
    }],
});
termSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.term_name = _id;
    return object;
});
const term = mongoose.model('term', termSchema);
module.exports = term;