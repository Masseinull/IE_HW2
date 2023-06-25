const mongoose = require('mongoose');
const { checkForClassTimingConflicts, checkForExamTimingConflicts } = require('../timing');

const regSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term',
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
    register_course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'regCourse.semester_courses.course',
        validate: {
          validator: async function (value) {
            const course = await mongoose.model('semester_course').findOne({ course_name: value });
            if (!checkForClassTimingConflicts(course, this.register_course)) {
              return false; 
            }
  
            if (!checkForExamTimingConflicts(course, this.register_course)) {
              return false; 
            }
  
  
            return true;
          },
          message: "course class/exam timing conflict",
        },
      }],
    student_id : {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    required: true,
    validate: {
        validator: async function(value) {
            const users = await mongoose.model('student').find({ _id: { $in: value }, type: { $in: ['student'] } });
            return !!users;
        },
        message: 'Error: 406 (Invalid student)',
      },
    },
    status : {
        type : String , 
        enum: ['accepted', 'not seen', 'rejected'],
    }
});
const reg = mongoose.model('reg', regSchema);
module.exports = reg;