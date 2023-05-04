const User = require('./user.model.js');
const mongoose = require('mongoose');
const Teacher = new mongoose.Schema({
    faculty: {
        type: String,
        required: true
    },
    field:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true,
        enum: ['Lecturer', 'Associate Professor', 'Assistant Professor', 'Professor']
    }
}
);

const teacher = User.discriminator('teacher', Teacher);
module.exports = teacher;