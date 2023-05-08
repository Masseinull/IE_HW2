const bcrypt = require('bcryptjs');
const db = require("../models/index");
const Teacher = db.teacher;
// Create a new teacher

exports.createTeacher = (req, res) => {
    const password_encrypted = bcrypt.hash(req.body.password, 10);
    const teacher = new Teacher({
        name: req.body.name,
        _id: req.body._id,
        email: req.body.email,
        password: password_encrypted,
        phone: req.body.phone,
        role: 'teacher',
        faculty: req.body.faculty,
        field: req.body.field,
        level: req.body.level
    });

    teacher.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the teacher.'
            });
        });
};

// Retrieve all teachers from the database
exports.findAllTeachers = (req, res) => {
    Teacher.find()
        .then(teachers => {
            res.send(teachers);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving teachers.'
            });
        });
};

// Find a single teacher with a teacherId
exports.findOneTeacher = (req, res) => {
    const id = req.params.id;
    Teacher.findById(id)
        .then(teacher => {
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Teacher not found with id ' + id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving teacher with id ' + id
            });
        });
};

// Update a teacher identified by the teacherId in the request
exports.updateTeacher = (req, res) => {
    const id = req.params.id;
    Teacher.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((teacher) => {
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).json({ message: 'Student not found' });
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

// Delete a teacher with the specified teacherId in the request
exports.deleteTeacher = (req, res) => {
    const id = req.params.id;
    Teacher.findByIdAndDelete(id)
        .then((teacher) => {
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).json({message: 'Teacher not found'});
            }
        })
        .catch((error) => {
            res.status(500).json({message: error.message});
        });
};