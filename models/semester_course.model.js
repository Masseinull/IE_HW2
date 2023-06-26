const mongoose = require('mongoose');

const SemesterCourse = new mongoose.Schema({
    general_course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            required: true
        },
    _id:{
        type: String,
        validate: {
            validator: function (v) {
                return /d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid ID`
        }
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
            },
            message: 'Error: 404 (Invalid class time)'
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
            },
            message: 'Error: 404 (Invalid exam time)'
        }
    },
    exam_location:{
        type: [mongoose.Schema.Types.Mixed], //[faculty_name, room_number]
        required: true,
        validate:{
            validator: async function (value){
                let availableFaculty = undefined;
                if(typeof value[0] == "string"){
                    const faculty = await mongoose.model('faculty').findOne({faculty_name: value[0]});
                    availableFaculty = !!faculty;
                }
                return (value.length === 2 &&
                    typeof value[0] == "string" &&
                    typeof value[1] == "number" &&
                    value[1] > 0) && (availableFaculty);
            },
            message: 'Error: 404 (Invalid exam location)'
        }
    },
    teacher:{
        type: Number,
        required: true,
        ref: 'teacher',
        validate: {
            validator: async function(value) {
                const teacher = await mongoose.model('teacher').findOne({_id: value});
                return !!teacher;
            },
            message: 'Error: 406 (Invalid teacher id)',
        }
    },
    semester: {
        type: Number,// 4 digits XXX1(August) or XXX2(January) or XXX3(Summer)
        required: true,
        ref: 'term',
        validate: {
            validator: async function(value) {
                const term = await mongoose.model('term').findOne({_id: value});
                return !!term;
            },
            message: 'Error: 406 (Invalid term)',
        }
    }

}
);
SemesterCourse.index({ general_course: 1, teacher: 1, semester: 1 }, { unique: true });
// const semesterCourse = Course.discriminator('semesterCourse', SemesterCourse);
SemesterCourse.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const semesterCourse = mongoose.model('semesterCourse', SemesterCourse);
module.exports = semesterCourse;