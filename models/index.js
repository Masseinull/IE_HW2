const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.student = require("./student.model.js")(mongoose);
db.teacher = require("./teacher.model.js")(mongoose);
db.educationalManager = require("./educational_manager.model.js")(mongoose);
db.course = require("./course.model.js")(mongoose);
db.semesterCourse = require("./semester_course.model.js")(mongoose);
module.exports = db;