const db = require("../models");
const Teacher = db.teacher;

exports.createTeacher = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const teacher = new Teacher({
        name: req.body.name,
        _id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        role: 'teacher',
        study_level: req.body.study_level,
        entry_year: req.body.entry_year,
        entry_semester: req.body.entry_semester,
        GPA: req.body.GPA,
        faculty: req.body.faculty,
        field: req.body.field
    });

    // Save Teacher in the databases (teacher and user)
    Teacher
        .save(teacher)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the teacher."
            });
        });
};

exports.findAll = (req, res) => {
    Teacher.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teachers."
            });
        });
};


