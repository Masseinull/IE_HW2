module.exports = app => {
    const faculty = require("../controllers/faculty.controller.js");
    const {isAdmin} = require("../middleware/authAdmin");
    var router = require("express").Router();


    router.post("/admin/faculty", isAdmin, faculty.createFaculty);

    app.use('/api', router);
};