module.exports = app => {
    const teacher = require("../controllers/teacher.controller.js");

    var router = require("express").Router();

    router.post("/admin/Professor", teacher.createTeacher);

    // Retrieve all Teachers
    router.get("/admin/Professors", teacher.findAllTeachers);
    router.get("/Professors", teacher.findAllTeachers);

    // Retrieve a single Teacher with id
    router.get("/admin/Professor/:id", teacher.findOneTeacher);
    router.get("/Professor/:id", teacher.findOneTeacher);

    // Update a Teacher with id
    router.put("/admin/Professor/:id", teacher.updateTeacher);
    router.put("/Professor/:id", teacher.updateTeacher);

    // Delete a Teacher with id
    router.delete("/admin/Professor/:id", teacher.deleteTeacher);

    app.use('/api', router);
};
