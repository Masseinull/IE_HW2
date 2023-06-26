const User = require('./user.model.js');
const mongoose = require('mongoose');

const EducationalManager = new mongoose.Schema({
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
    }
);
const educationalManager = User.discriminator('educationalManager', EducationalManager);
module.exports = educationalManager;