module.exports = app => {
    const faculty = require("../controllers/faculty.controller.js");
    const {isAdmin} = require("../middleware/authAdmin");
    const {verifyToken} = require("../middleware/auth");

    var router = require("express").Router();


    router.post("/admin/faculty", verifyToken, isAdmin, faculty.createFaculty);

    router.get("/admin/faculties", verifyToken, isAdmin, faculty.findAllFaculties);

    router.put("/admin/faculty/:id", verifyToken, isAdmin, faculty.updateFaculty);

    app.use('/api', router);
};