const {verifyToken} = require("../middleware/auth");
const {isManager} = require("../middleware/authManager");
const {isStudentOrManager} = require("../middleware/authStudentOrManager");
const {isStudent} = require("../middleware/authStudent");

module.exports = app => {
    const preRegCourse = require("../controllers/preRegCourses.controller.js");
    const preReg = require("../controllers/preReg.controller.js");
    var router = require("express").Router();

    router.post("/term/:id/preregistration", verifyToken, isManager, preRegCourse.addSemesterCourseToPreregistration);

    router.get("/terms/:id/preregistration_courses", verifyToken, isStudentOrManager, preRegCourse.getPreregistrationCourses);

    router.delete("/term/:id/preregistration", verifyToken, isManager, preRegCourse.removeSemesterCourseFromPreregistration);

    router.get("/term/:id/preregistrations", verifyToken, isStudentOrManager, preReg.termBasedPreRegistrations);

    router.get("/course/:id/preregistrations", verifyToken, isManager, preReg.courseBasedPreRegistrations);

    router.post("/course/preregister/:id", verifyToken, isStudent, preReg.preregisterCourse);

    router.delete("/course/preregister/:id", verifyToken, isStudent, preReg.cancelPreregisterCourse);

    app.use('/api', router);
};