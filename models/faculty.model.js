const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    faculty_name: {
        type: String ,
        unique : true,
    },
});
const faculty = mongoose.model('faculty', facultySchema);
module.exports = faculty;