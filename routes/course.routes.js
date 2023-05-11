module.exports = app => {
    const course = require("../controllers/course.controller.js");
    const {verifyToken} = require("../middleware/auth");
    const {isManager} = require("../middleware/authManager");
    var router = require("express").Router();

    // Create a new Course
    router.post("/course", verifyToken, isManager, course.createCourse);

    // Retrieve all Course
    router.get("/courses", verifyToken, isManager);

    // Retrieve a single Course with id
    router.get("/course/:id", verifyToken, isManager);

    // Update a Course with id
    router.put("/course/:id", verifyToken, isManager);

    // Delete a Course with id
    router.delete("/course/:id", verifyToken, isManager);

    app.use('/api', router);
};
