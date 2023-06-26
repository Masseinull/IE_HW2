const mongoose = require('mongoose');

const preRegSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        unique: true,
        ref: 'term',
        validate: {
            validator: async function(value) {
                const term = await mongoose.model('term').findOne({_id: value});
                return !!term;
            },
            message: 'Error: 406 (Invalid term)',
        }
    },
    preReg_course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'preRegCourse'
      }],
    student_id : {
      type: [{
          type: Number,
          ref: 'student',
          validate: {
              validator: async function(value) {
                  const student = await mongoose.model('student').findOne({_id: value});
                  return !!student;
              },
              message: 'Error: 406 (Invalid student)',
          }
      }],
    // required: true,
    validate: {
        validator: async function(value) {
            const users = await mongoose.model('student').find({ _id: { $in: value }, type: { $in: ['student'] } });
            return !!users;
        },
        message: 'Error: 406 (Invalid student)',
      },
    },
});
const preReg = mongoose.model('preReg', preRegSchema);
module.exports = preReg;