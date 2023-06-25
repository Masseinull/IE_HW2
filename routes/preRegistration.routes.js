const {verifyToken} = require("../middleware/auth");
const {isManager} = require("../middleware/authManager");
const {isStudentOrManager} = require("../middleware/authStudentOrManager");
module.exports = app => {
    const preRegCourse = require("../controllers/preRegCourses.controller.js");
    var router = require("express").Router();

    router.post("/term/:id/preregistration", verifyToken, isManager, preRegCourse.addSemesterCourseToPreregistration);
    router.get("/terms/:id/preregistration_courses", verifyToken, isStudentOrManager, preRegCourse.getPreregistrationCourses);
    router.delete("/term/:id/preregistration", verifyToken, isManager, preRegCourse.removeSemesterCourseFromPreregistration);

    app.use('/api', router);
};