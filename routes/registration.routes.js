const {verifyToken} = require("../middleware/auth");
const {isManager} = require("../middleware/authManager");
const {isStudentOrManager} = require("../middleware/authStudentOrManager");
const regCourse = require("../controllers/registerationCourses.controller");
module.exports = app => {
    const preRegCourse = require("../controllers/preRegCourses.controller.js");
    var router = require("express").Router();

    router.post("/term/:id/registration", verifyToken, isManager, regCourse.addSemesterCourseToRegistration);
    router.get("/terms/:id/registration_courses", verifyToken, isStudentOrManager, regCourse.getReregistrationCourses);
    router.delete("/term/:id/registration", verifyToken, isManager, regCourse.removeSemesterCourseFromRegistration);

    app.use('/api', router);
};