const bcrypt = require('bcryptjs');
const db = require("../models/index");
const EducationalManager = db.educationalManager;

// Create a new educational manager
exports.createEducationalManager = async (req, res) => {
    const password_encrypted = await bcrypt.hash(req.body.password, 10);
    const educationalManager = new EducationalManager({
        name: req.body.name,
        _id: req.body._id,
        email: req.body.email,
        password: password_encrypted,
        phone: req.body.phone,
        faculty: req.body.faculty
    });

    educationalManager.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the educational manager.'
            });
        });
};

// Retrieve all educational managers from the database
exports.findAllEducationalManagers = (req, res) => {
    EducationalManager.find()
        .then(educationalManagers => {
            res.send(educationalManagers);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving educational managers.'
            });
        });
};

// Find a single educational manager with an educationalManagerId
exports.findOneEducationalManager = (req, res) => {
    const id = req.params.id;
    EducationalManager.findById(id)
        .then(educationalManager => {
            if (educationalManager) {
                res.status(200).json(educationalManager);
            } else {
                res.status(404).json({ message: 'Educational manager not found' });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Educational manager not found with id ' + id
                });
            }
            return res.status(500).send({
                message: 'Error retrieving educational manager with id ' + id
            });
        });
};

// Update an educational manager identified by the educationalManagerId in the request
exports.updateEducationalManager = (req, res) => {
    const id = req.params.id;
    EducationalManager.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((educationalManager) => {
            if (educationalManager) {
                res.status(200).json(educationalManager);
            } else {
                res.status(404).json({ message: 'Educational manager not found' });
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

// Delete an educational manager with the specified educationalManagerId in the request
exports.deleteEducationalManager = (req, res) => {
    const id = req.params.id;
    EducationalManager.findByIdAndDelete(id)
        .then((educationalManager) => {
            if (educationalManager) {
                res.status(200).json(educationalManager);
            } else {
                res.status(404).json({ message: 'Educational manager not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};
