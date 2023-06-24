const {verifyToken} = require("../middleware/auth");
const {isAdmin} = require("../middleware/authAdmin");
const {isManager} = require("../middleware/authManager");
const student = require("../controllers/student.controller");
const {isThisStudent} = require("../middleware/authStudent");
const {isStudentOrManager} = require("../middleware/authStudentOrManager");
const term = require("../controllers/term.controller");
module.exports = app => {
    const preRegister = require("../controllers/preRegistration.controller.js");
    var router = require("express").Router();

    // router.post("/term", verifyToken, isManager, term.createTerm);
    //
    // Retrieve all Terms
    router.get("/terms/:id/preregistration_courses", verifyToken, isStudentOrManager, preRegister.findAllCourses);
    //
    //
    // // Retrieve a single term with id preregister courses
    // router.get("/term/:id", verifyToken, isManager, term.getTermById);
    //
    // // Update a Term with id
    // router.put("/admin/student/:id", verifyToken, isAdmin, student.updateStudentById);
    // router.put("/term/:id", verifyToken, isManager, term.updateTermById);
    //
    // // // Delete a Term with id
    // router.delete("/term/:id", verifyToken, isManager, term.deleteTermById);

    app.use('/api', router);
};