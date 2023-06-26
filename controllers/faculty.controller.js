const db = require("../models/index");
const Faculty = db.faculty;
exports.createFaculty = async (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a faculty

    const faculty = new Faculty({
        faculty_name: req.body.faculty_name
    });

    // Save student in the databases (user and student)
    faculty
        .save(faculty)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the faculty."
                // term
            });
        });
};


