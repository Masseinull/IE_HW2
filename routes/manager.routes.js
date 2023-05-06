module.exports = app => {
    const educationalManager = require("../controllers/educational_manager.controller.js");

    var router = require("express").Router();

    // Create a new Educational Manager
    router.post("/admin/manager", educationalManager.createEducationalManager);

    // Retrieve all Educational Managers
    router.get("/admin/managers", educationalManager.findAllEducationalManagers);

    // Retrieve a single Educational Manager with id
    router.get("/admin/manager/:id", educationalManager.findOneEducationalManager);

    // Update an Educational Manager with id
    router.put("/admin/manager/:id", educationalManager.updateEducationalManager);

    // Delete an Educational Manager with id
    router.delete("/admin/manager/:id", educationalManager.deleteEducationalManager);

    app.use('/api', router);
};
