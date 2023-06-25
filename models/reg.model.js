const mongoose = require('mongoose');

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
        ref: 'regCourse'
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