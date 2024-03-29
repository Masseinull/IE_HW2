const {verifyToken} = require("../middleware/auth");
const {isAdmin} = require("../middleware/authAdmin");
const {isManager} = require("../middleware/authManager");
module.exports = app => {
    const student = require("../controllers/student.controller.js");
    const { verifyToken } = require("../middleware/auth");
    const { isAdmin } = require("../middleware/authAdmin");
    const { isThisStudent } = require("../middleware/authStudent");
    const { isManager } = require("../middleware/authManager");
    var router = require("express").Router();

    router.post("/admin/student", verifyToken, isAdmin, student.createStudent);

    // Retrieve all Students
    router.get("/admin/students", verifyToken, isAdmin, student.findAllStudents);
    router.get("/students", verifyToken, isManager, student.findAllStudents);


    // Retrieve a single Student with id
    router.get("/admin/student/:id", verifyToken, isAdmin, student.getStudentById);
    router.get("/student/:id", verifyToken, isManager, student.getStudentById);

    // Update a Student with id
    router.put("/admin/student/:id", verifyToken, isAdmin, student.updateStudentById);
    router.put("/student/:id", verifyToken, isThisStudent, student.updateStudentById);

    // // Delete a Student with id
    router.delete("/admin/student/:id", verifyToken, isAdmin, student.deleteStudentById);

    app.use('/api', router);
};