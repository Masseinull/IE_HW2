const User = require('./user.model.js');
const mongoose = require('mongoose');

const EducationalManager =  new mongoose.Schema({
        faculty: {
            type: String,
            required: true,
            ref: 'faculty'
        }
    }
);
const educationalManager = User.discriminator('educationalManager', EducationalManager);
module.exports = educationalManager;