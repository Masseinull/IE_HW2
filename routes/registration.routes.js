const {verifyToken} = require("../middleware/auth");
const {isManager} = require("../middleware/authManager");
const {isStudentOrManager} = require("../middleware/authStudentOrManager");
const {isStudent} = require("../middleware/authStudent");
const regCourse = require("../controllers/registrationCourses.controller");
const reg = require("../controllers/reg.controller");
module.exports = app => {
    const preRegCourse = require("../controllers/preRegCourses.controller.js");
    var router = require("express").Router();

    router.post("/term/:id/registration", verifyToken, isManager, regCourse.addSemesterCourseToRegistration);

    router.get("/terms/:id/registration_courses", verifyToken, isStudentOrManager, regCourse.getReregistrationCourses);

    router.delete("/term/:id/registration", verifyToken, isManager, regCourse.removeSemesterCourseFromRegistration);

    router.post("/course/register/:id", verifyToken, isStudent, reg.registerCourse);

    router.delete("/course/register/:id", verifyToken, isStudent, ); // comp
    app.use('/api', router);
};