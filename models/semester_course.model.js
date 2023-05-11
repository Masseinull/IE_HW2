const Course = require('./course.model.js');
const Teacher = require('./teacher.model.js');
const mongoose = require('mongoose');

const SemesterCourse = new mongoose.Schema({
    general_course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            required: true
        },
    course_name:{
        type: String,
        required: true
    },
    class_time: {
        type: [mongoose.Schema.Types.Mixed], //[day in week, day_2 in week, start_time, end_time] or
        // [day in week, start_time, end_time]
        required: true,
        validate:{
            validator: function (value){
                return (value.length === 4 &&
                        typeof value[0] == "number" &&
                        typeof value[1] == "number" &&
                        typeof value[2] == "number" &&
                        typeof value[3] == "number" &&
                        value[2] < value[3] &&
                        value[2] >= 1 && value[2] <= 24 &&
                        value[3] >= 1 && value[3] <= 24 &&
                        value[0] <= value[1] &&
                        value[0] >= 1 && value[0] <= 7 &&
                        value[1] >= 1 && value[1] <= 7) ||
                    (value.length === 3 &&
                        typeof value[0] == "number" &&
                        typeof value[1] == "number" &&
                        typeof value[2] == "number" &&
                        value[1] < value[2] &&
                        value[1] >= 1 && value[1] <= 24 &&
                        value[2] >= 1 && value[2] <= 24 &&
                        value[0] >= 1 && value[0] <= 7 )
            }
        }
    },
    exam_time:{
        type: [mongoose.Schema.Types.Mixed], //[day_in_exam_time, start_time, end_time]
        required: true,
        validate:{
            validator: function (value){
                return value.length === 3 &&
                    typeof value[0] == "number" &&
                    typeof value[1] == "number" &&
                    typeof value[2] == "number" &&
                    value[1] < value[2] &&
                    value[1] >= 1 && value[1] <= 24 &&
                    value[2] >= 1 && value[2] <= 24 &&
                    value[0] >= 1 && value[0] <= 14 //14 days of exams
            }
        }
    },
    exam_location:{
        type: [mongoose.Schema.Types.Mixed], //[faculty_name, room_number]
        required: true,
        validate:{
            validator: function (value){
                return value.length === 2 &&
                    typeof value[0] == "string" &&
                    typeof value[1] == "number" &&
                    value[1] > 0
            }
        }
    },
    teacher:{
        type: String,
        required: true,
        ref: 'teacher',
        validate: {
            validator: async function(value) {
                const teacher = await mongoose.model('teacher').findOne({name: value});
                return !!teacher;
            },
            message: 'Error: 406 (Invalid teacher)',
        }
    },
    capacity:{
        type: Number,
        min: 0,
        required: true
    },
    semester: {
        type: Number,// 4 digits XXX1(August) or XXX2(January) or XXX3(Summer)
        required: true,
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
            message: 'Error: 406 (Invalid semester)',
        }
    }

}
);
SemesterCourse.index({ course: 1, teacher: 1, semester: 1 }, { unique: true });
// const semesterCourse = Course.discriminator('semesterCourse', SemesterCourse);
const semesterCourse = mongoose.model('semesterCourse', SemesterCourse);
module.exports = semesterCourse;