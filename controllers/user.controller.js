const db = require("../models");
const bcrypt = require('bcryptjs');
const User = db.user;
const Admin = db.admin;
// Create and Save a new User

exports.create = async (req, res) => {
    // Validate request
    const password_encrypted = await bcrypt.hash(req.body.password, 10);
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        _id: req.body.id,
        password: password_encrypted,
        email: req.body.email,
        phone: req.body.phone
    });

    // Save User in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//     User.find({})
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || 'Error occurred while retrieving users.',
//             });
//         });
// };
//
// // Find a single User with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//
//     User.findById(id)
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found User with id " + id });
//             else res.send(data);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving User with id=" + id });
//         });
// };
//
// // Update a User by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }
//
//     const id = req.params.id;
//     User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update Tutorial with id=${id}. Maybe User was not found!`
//                 });
//             } else res.send({ message: "User was updated successfully." });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating User with id=" + id
//             });
//         });
// };
//
// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
//
//     User.findByIdAndRemove(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete User with id=${id}. Maybe User was not found!`
//                 });
//             } else {
//                 res.send({
//                     message: "User was deleted successfully!"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             });
//         });
// };
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//     User.deleteMany({})
//         .then(data => {
//             res.send({
//                 message: `${data.deletedCount} Users were deleted successfully!`
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all users."
//             });
//         });
// };

exports.admin = async (req, res) => {
    // Validate request
    const password_encrypted = await bcrypt.hash(req.body.password, 10);
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const admin = new Admin({
        name: 'admin',
        _id: 0,
        password: password_encrypted,
        email: 'admin@admin.com',
        phone: 9913641048
    });

    // Save admin in the database, only one time executes at first launch
    admin.save(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};




