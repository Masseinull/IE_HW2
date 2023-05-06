module.exports = app => {
    const teacher = require("../controllers/teacher.controller.js");

    var router = require("express").Router();

    router.post("/admin/teacher", teacher.createTeacher);

    // Retrieve all Teachers
    router.get("/admin/teachers", teacher.findAllTeachers);
    router.get("/teachers", teacher.findAllTeachers);

    // Retrieve a single Teacher with id
    router.get("/admin/teacher/:id", teacher.findOneTeacher);
    router.get("/teacher/:id", teacher.findOneTeacher);

    // Update a Teacher with id
    router.put("/teacher/:id", teacher.updateTeacher);

    // Delete a Teacher with id
    router.delete("/admin/teacher/:id", teacher.deleteTeacher);

    app.use('/api', router);
};
