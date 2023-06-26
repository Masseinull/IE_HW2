const User = require('./user.model.js');
const mongoose  = require('mongoose');
const Student = new mongoose.Schema({
    study_level: {
        type: String,
        enum: ['BS', 'MS', 'PhD'],
        required: true
    },
    entry_year: {
        type: Number,
        required: true,
        min: 0
    },
    entry_semester: {
        type: mongoose.Schema.Types.ObjectId, // 4 digit number, XXX1 (August) , XXX2 (January), XXX3 (Summer)
        required: true,
        ref: 'term'
    },
    GPA: {
        type: Number,
        min: 0,
        max: 20,
        required: true
    },
    faculty: {
        type: String,
        required: true,
        ref: 'faculty',
        validate: {
            validator: async function(value) {
                const faculty = await mongoose.model('faculty').findOne({faculty_name: value});
                return !!faculty;
            },
            message: 'Error: 406 (Invalid faculty)',
        }
    },
    field:{
        type: String,
        required: true
    },
    supervisor : {
        type : Number ,
        ref: 'teacher',
        validate: {
            validator: async function(value) {
                const teacher = await mongoose.model('teacher').findOne({_id: value});
                return !!teacher;
            },
            message: 'Error: 406 (Invalid teacher id)',
        }
    },
    preReg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'preReg'
    },
    reg : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reg'
    }],
    passed_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
      }]
    }
);

const student = User.discriminator('student', Student);
module.exports = student;
