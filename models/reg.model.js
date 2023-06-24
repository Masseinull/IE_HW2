const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    term_id: {
        type: Number,
        ref: 'term'
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