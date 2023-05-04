const db = require("../models");
const Manager = db.educationalManager;



exports.createTeacher = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const manager = new Manager({
        name: req.body.name,
        _id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        role: 'educational manager',
        faculty: req.body.faculty
    });

    // Save Manager in the databases (educational_manager and user)
    Manager
        .save(manager)
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

// Find all managers
exports.findAll = (req, res) => {
    Manager.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving managers."
            });
        });
};