const User = require('./user.model.js');
const mongoose = require('mongoose');
const Teacher = new mongoose.Schema({
        faculty: {
            type: String,
            required: true,
            ref: 'faculty',
            validate: {
                validator: async function (value) {
                    const faculty = await mongoose.model('faculty').findOne({faculty_name: value});
                    return !!faculty;
                },
                message: 'Error: 406 (Invalid faculty)',
            }
        },
        field: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true,
            enum: ['Lecturer', 'Associate Professor', 'Assistant Professor', 'Professor']
        }
    }
);

const teacher = User.discriminator('teacher', Teacher);
module.exports = teacher;