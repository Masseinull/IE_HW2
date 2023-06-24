const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js");
db.admin = require("./admin.model.js");
db.student = require("./student.model.js");
db.teacher = require("./teacher.model.js");
db.educationalManager = require("./educational_manager.model.js");
db.course = require("./course.model.js");
db.semesterCourse = require("./semester_course.model.js");
db.term = require("./term.model.js");
db.faculty = require("./faculty.model.js");
db.preRegCourse = require("./preRegCourse.model.js");
module.exports = db;