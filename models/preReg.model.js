const mongoose = require('mongoose');

const preRegSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term'
    },
    preReg_course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'preRegCourse'
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
});
const preReg = mongoose.model('preReg', preRegSchema);
module.exports = preReg;