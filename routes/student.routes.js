module.exports = app => {
    const student = require("../controllers/student.controller.js");

    var router = require("express").Router();

    router.post("/admin/student", student.createStudent);

    // Retrieve all Students
    router.get("/admin/students", student.findAllStudents);
    router.get("/students", student.findAllStudents);


    // Retrieve a single Student with id
    router.get("/admin/student/:id", student.getStudentById);
    router.get("/student/:id", student.getStudentById);

    // Update a Student with id
    router.put("/admin/student/:id", student.updateStudentById);
    router.put("/student/:id", student.updateStudentById);

    // // Delete a Student with id
    router.delete("/admin/student/:id", student.deleteStudentById);

    app.use('/api', router);
};