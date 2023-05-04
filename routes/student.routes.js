module.exports = app => {
    const student = require("../controllers/student.controller.js");

    var router = require("express").Router();

    router.post("/admin/student", student.createStudent);

    // // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
    //
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    //
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
    //
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    //
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
    //
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api', router);
};