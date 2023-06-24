const user = require('./user.model');
const sCourse = require('./semester_course.model')
const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    term_name: {
        type: String ,
        unique : true,
    },
    users_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user' 
    }] ,
    semester_courses: [sCourse.Schema],
});
const term = mongoose.model('term', termSchema);
module.exports = term;