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

exports.findAllFaculties = (req, res) => {
    Faculty.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving faculties."
            });
        });
};

exports.updateFaculty = async (req, res) => {
    const id = req.params.id;
    Faculty.findOneAndUpdate({faculty_name: id}, req.body, { new: true, runValidators: true })
        .then((faculty) => {
            if (faculty) {
                res.status(200).json(faculty);
            } else {
                res.status(404).json({ message: 'Faculty not found' });
            }
        })
        .catch((error) => {
            if (error.name === 'ValidationError') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        });
};

