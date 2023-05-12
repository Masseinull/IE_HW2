const {isAdmin} = require("../middleware/authAdmin");
module.exports = app => {
    const course = require("../controllers/course.controller.js");
    const {verifyToken} = require("../middleware/auth");
    const {isManager} = require("../middleware/authManager");
    const {isUniversityMember} = require("../middleware/authUniversityMember");
    var router = require("express").Router();

    // Create a new Course
    router.post("/course", verifyToken, isManager, course.createCourse);

    // Retrieve all Course
    router.get("/courses", verifyToken, isUniversityMember, course.findAllCourses);

    // Retrieve a single Course with id
    router.get("/course/:id", verifyToken, isUniversityMember, course.findOneCourse);

    // Update a Course with id
    router.put("/course/:id", verifyToken, isManager, course.updateCourse);

    // Delete a Course with id
    router.delete("/course/:id", verifyToken, isManager, course.deleteCourse);

    app.use('/api', router);
};
