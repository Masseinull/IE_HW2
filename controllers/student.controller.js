const db = require("../models/index");
const Student = db.student;

exports.createStudent = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const student = new Student({
        name: req.body.name,
        _id: req.body._id,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        role: 'student',
        study_level: req.body.study_level,
        entry_year: req.body.entry_year,
        entry_semester: req.body.entry_semester,
        GPA: req.body.GPA,
        faculty: req.body.faculty,
        field: req.body.field
    });

    // Save student in the databases (user and student)
    student
        .save(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
                // student
            });
        });
};

exports.findAll = (req, res) => {
    Student.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};



