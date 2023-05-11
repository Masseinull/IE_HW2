const User = require('./user.model.js');
const mongoose = require('mongoose');

const Admin =  new mongoose.Schema({
    }
);
const admin = User.discriminator('admin', Admin);
module.exports = admin;