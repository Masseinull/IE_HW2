const db = require("../models/index");
const genCourse = db.course;
const semCourse = db.semesterCourse;

// Create and save a new course
exports.createCourse = async (req, res) => {
    if (req.body.courseType === "semester") {
        const generalCourse = await genCourse.findOne({_id: req.body._id});
        if(!generalCourse){
            res.status(406).send({
                message:
                    "This course isn't valid in general courses"
            });
            return;
        }
        console.log(`here ==> ${generalCourse}`);
        const course = new semCourse({
            general_course: generalCourse,
            course_name: generalCourse._id,
            class_time: req.body.class_time,
            exam_time: req.body.exam_time,
            exam_location: req.body.exam_location,
            teacher: req.body.teacher,
            capacity: req.body.capacity,
            semester: req.body.semester
        });

        course.save(course)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the course."
                });
            });
    } else {
        const course = new genCourse({
            _id: req.body._id,
            pre_required: req.body.pre_required,
            co_required: req.body.co_required,
            credit: req.body.credit,
            field: req.body.field
        });

        course.save(course)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                const status = err.message.split(' ')[4];
                if (Number(status) == 406) {
                    res.status(406).send({
                        message:
                            err.message || "Some error occurred while creating the course."
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the course."
                    });
                }
            });
    }
};

// Retrieve all courses from the database.
exports.findAllCourses = (req, res) => {
    genCourse.find()
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

    genCourse.findById(id)
        .then(course => {
            if (!course)
                res.status(404).send({ message: "Course not found with id " + id });
            else res.send(course);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving course with id " + id });
        });
};

// Update a course by the id in the request
exports.updateCourse = (req, res) => {
    const id = req.params.id;

    genCourse.findByIdAndUpdate(id, req.body, { useFindAndModify: false , runValidators: true})
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

    genCourse.findByIdAndRemove(id)
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
