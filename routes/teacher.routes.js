const {isManager} = require("../middleware/authManager");
module.exports = app => {
    const teacher = require("../controllers/teacher.controller.js");
    const { verifyToken } = require("../middleware/auth");
    const { isAdmin } = require("../middleware/authAdmin");
    const { isThisTeacher } = require("../middleware/authTeacher");
    const { isManager } = require("../middleware/authManager");

    var router = require("express").Router();

    router.post("/admin/Professor", verifyToken, isAdmin, teacher.createTeacher);

    // Retrieve all Teachers
    router.get("/admin/Professors", verifyToken, isAdmin, teacher.findAllTeachers);
    router.get("/Professors", verifyToken, isManager, teacher.findAllTeachers);

    // Retrieve a single Teacher with id
    router.get("/admin/Professor/:id", verifyToken, isAdmin, teacher.findOneTeacher);
    router.get("/Professor/:id", verifyToken, isManager, teacher.findOneTeacher);

    // Update a Teacher with id
    router.put("/admin/Professor/:id", verifyToken, isAdmin, teacher.updateTeacher);
    router.put("/Professor/:id", verifyToken, isThisTeacher, teacher.updateTeacher);

    // Delete a Teacher with id
    router.delete("/admin/Professor/:id", verifyToken, isAdmin, teacher.deleteTeacher);

    app.use('/api', router);
};
