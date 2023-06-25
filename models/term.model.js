const user = require('./user.model');
const Semester_course = require('./semester_course.model')
const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    term_id: {
        type: Number ,
        unique : true,
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
    current_term :{
        type: Boolean,
        required : true
    },
});
termSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.term_name = _id;
    return object;
});
const term = mongoose.model('term', termSchema);
module.exports = term;