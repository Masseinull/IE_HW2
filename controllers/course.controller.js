const db = require("../models/index");
const Course = db.course;

// Create and save a new course
exports.createCourse = (req, res) => {
    const course = new Course({
        name: req.body.name,
        pre_required: req.body.pre_required,
        co_required: req.body.co_required,
        credit: req.body.credit
    });

    course.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the course."
            });
        });
};

// Retrieve all courses from the database.
exports.findAllCourses = (req, res) => {
    Course.find()
        .then(courses => {
            res.send(courses);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        });
};

// Find a single course with an id
exports.findOneCourse = (req, res) => {
    const id = req.params.id;

    Course.findById(id)
        .then(course => {
            if (!course)
                res.status(404).send({ message: "Course not found with id " + id });
            else res.send(course);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving course with id=" + id });
        });
};

// Update a course by the id in the request
exports.updateCourse = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(course => {
            if (!course) {
                res.status(404).send({
                    message: `Cannot update course with id=${id}. Course not found!`
                });
            } else res.send({ message: "Course was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating course with id=" + id
            });
        });
};

// Delete a course with the specified id in the request
exports.deleteCourse = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndRemove(id)
        .then(course => {
            if (!course) {
                res.status(404).send({
                    message: `Cannot delete course with id=${id}. Course not found!`
                });
            } else {
                res.send({
                    message: "Course was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete course with id=" + id
            });
        });
};
