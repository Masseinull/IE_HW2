module.exports = app => {
    const educationalManager = require("../controllers/educational_manager.controller.js");
    const {verifyToken} = require("../middleware/auth");
    const {isAdmin} = require("../middleware/authAdmin");
    var router = require("express").Router();

    // Create a new Educational Manager
    router.post("/admin/manager", verifyToken, isAdmin, educationalManager.createEducationalManager);

    // Retrieve all Educational Managers
    router.get("/admin/managers", verifyToken, isAdmin, educationalManager.findAllEducationalManagers);

    // Retrieve a single Educational Manager with id
    router.get("/admin/manager/:id", verifyToken, isAdmin, educationalManager.findOneEducationalManager);

    // Update an Educational Manager with id
    router.put("/admin/manager/:id", verifyToken, isAdmin, educationalManager.updateEducationalManager);

    // Delete an Educational Manager with id
    router.delete("/admin/manager/:id", verifyToken, isAdmin, educationalManager.deleteEducationalManager);

    app.use('/api', router);
};
