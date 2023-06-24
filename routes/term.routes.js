const {verifyToken} = require("../middleware/auth");
const {isAdmin} = require("../middleware/authAdmin");
const {isManager} = require("../middleware/authManager");
const student = require("../controllers/student.controller");
const {isThisStudent} = require("../middleware/authStudent");
const {isUniversityMember} = require("../middleware/authUniversityMember");
module.exports = app => {
    const term = require("../controllers/term.controller.js");
    var router = require("express").Router();

    router.post("/term", verifyToken, isManager, term.createTerm);
    //
    // Retrieve all Terms
    router.get("/terms", verifyToken, isUniversityMember, term.findAllTerms);
    //
    //
    // // Retrieve a single term with id
    router.get("/term/:id", verifyToken, isManager, term.getTermById);
    //
    // // Update a Term with id
    // router.put("/admin/student/:id", verifyToken, isAdmin, student.updateStudentById);
    router.put("/term/:id", verifyToken, isManager, term.updateTermById);
    //
    // // // Delete a Term with id
    router.delete("/term/:id", verifyToken, isManager, term.deleteTermById);

    app.use('/api', router);
};