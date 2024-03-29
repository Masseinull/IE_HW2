const bcrypt = require('bcryptjs');
const db = require("../models/index");
const Student = db.student;
exports.createStudent = async (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a User

    const password_encrypted = await bcrypt.hash(req.body.password, 10);
    const student = new Student({
        name: req.body.name,
        _id: req.body._id,
        password: password_encrypted,
        email: req.body.email,
        phone: req.body.phone,
        study_level: req.body.study_level,
        entry_year: req.body.entry_year,
        entry_semester: req.body.entry_semester,
        GPA: req.body.GPA,
        faculty: req.body.faculty,
        supervisor:req.body.supervisor,
        field: req.body.field ,
        passed_courses : [],
        reg : []
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

exports.findAllStudents = (req, res) => {
    if (req.type === 'admin') {
        if (req.body.filter) {

            Student.find({faculty: req.body.filter})
                .then(students => {
                    if (students) {

                        res.send(students);
                    } else {
                        res.status(404).json({message: 'Students not found in this faculty'});
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving students.'
                    });
                });
        } else {
            Student.find()
                .then(students => {
                    res.send(students);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving students.'
                    });
                });
        }

    } else {
        Student.find({faculty: req.faculty})
            .then(students => {

                if (students) {
                    res.send(students);
                } else {
                    res.status(404).json({message: `Students not found in this faculty ${req.faculty}`});
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving students.'
                });
            });
    }

};

exports.getStudentById = (req, res) => {
    const id = req.params.id;
    if (req.type === 'admin') {
        Student.findById(id)
            .then((student) => {
                if (student) {
                    res.status(200).json(student);
                } else {
                    res.status(404).json({message: 'Student not found'});
                }
            })
            .catch((error) => {
                res.status(500).json({message: error.message});
            });
    } else {
        Student.findById(id)
            .then((student) => {
                if (student) {
                    if (student.faculty === req.faculty) {
                        res.status(200).json(student);
                    } else {
                        res.status(404).json({message: `Student ${student.id} is not in your faculty`});
                    }
                } else {
                    res.status(404).json({message: 'Student not found'});
                }
            })
            .catch((error) => {
                res.status(500).json({message: error.message});
            });
    }
};

exports.updateStudentById = async (req, res) => {
    const id = req.params.id;
    if (req.body.password) {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = encryptedPassword;
    }
    Student.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        .then((student) => {
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({message: 'Student not found'});
            }
        })
        .catch((error) => {
            if (error.name === 'ValidationError') {
                res.status(400).json({message: error.message});
            } else {
                res.status(500).json({message: error.message});
            }
        });
};


exports.deleteStudentById = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndDelete(id)
        .then((student) => {
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({message: 'Student not found'});
            }
        })
        .catch((error) => {
            res.status(500).json({message: error.message});
        });
};