const db = require("../models/index");
const genCourse = db.course;
const semCourse = db.semesterCourse;

// Create and save a new course
exports.createCourse = async (req, res) => {
    if (req.body.courseType === "semester") {
        const generalCourse = await genCourse.findOne({_id: req.body.course_name});
        if(!generalCourse){
            res.status(406).send({
                message:
                    "This course isn't valid in general courses"
            });
            return;
        }
        // console.log(`here ==> ${generalCourse}`);
        const course = new semCourse({
            general_course: generalCourse,
            course_name: generalCourse._id,
            class_time: req.body.class_time,
            exam_time: req.body.exam_time,
            exam_location: req.body.exam_location,
            teacher: req.body.teacher,
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

// Retrieve all courses from the database. based on the role
exports.findAllCourses = async (req, res) => {
    if(req.type !== "educationalManager") {
        if (req.query.courseType === "semester") {
            const general = await genCourse.find({field: req.field});
            // Extract course names from the general courses
            const courseNames = general.map((gc) => gc._id);

            // Find semester courses with course field matching the extracted course names
          semCourse.find({ course_name: { $in: courseNames } })
                .then(courses => {
                    res.send(courses);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving semester courses in field "+ req.field
                    });
                });

        } else {
            console.log(`field id: ${req.field}`);
            genCourse.find({field: req.field})
                .then(courses => {
                    res.send(courses);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving general courses in " + req.field
                    });
                });
        }
    } else {
        if (req.query.courseType === "semester") {
            semCourse.find()
                .then(courses => {
                    res.send(courses);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving semester courses."
                    });
                });

        } else {
            genCourse.find()
                .then(courses => {
                    res.send(courses);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving general courses."
                    });
                });
        }
    }
};

// Find all semester courses with an id or general course with the id, define it in body as courseType
exports.findOneCourse = async (req, res) => {
    const id = req.params.id;
    console.log(`id is ${id} and field is ${req.field}`);
    if(req.type !== "educationalManager"){
        if(req.query.courseType === "semester"){
            const general = await genCourse.find({field: req.field});
            // Extract course names from the general courses
            const courseNames = general.map((gc) => gc._id);

            semCourse.find({ $and: [{ _id: id }, { course_name: { $in: courseNames } }] })
            .then(course => {
            if (!course)
                res.status(404).send({message: "No semester course for  " + id + " in field " + req.field});
            else res.send(course);
        })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving semester course with id " + id + " in field " + req.field});
            });
        } else{
            genCourse.find({ $and: [{ _id: id }, {field: req.field}] })
                .then(course => {
                    if (!course)
                        res.status(404).send({message: "No general course for  " + id + " in field " + req.field});
                    else res.send(course);
                })
                .catch(err => {
                    res
                        .status(500)
                        .send({message: "Error retrieving general course with id " + id + " in field " + req.field});
                });
        }
    }else{
    if(req.query.courseType === "semester"){
        semCourse.find({course_name: id})
            .then(course => {
                if (!course)
                    res.status(404).send({message: "No semester course for  " + id});
                else res.send(course);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving semester course with id " + id});
            });
    }else {
        genCourse.findById(id)
            .then(course => {
                if (!course)
                    res.status(404).send({message: "Course not found with id " + id});
                else res.send(course);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving course with id " + id});
            });
    }
    }
};

// Update a course by the id in the request
exports.updateCourse = (req, res) => {
    const id = req.params.id;
    if(req.body.courseType === "semester") {
        semCourse.findByIdAndUpdate(id, req.body, {useFindAndModify: false, runValidators: true})
            .then(course => {
                if (!course) {
                    res.status(404).send({
                        message: `Cannot update semester course with id=${id}. Semester course not found!`
                    });
                } else res.send({message: "Semester Course was updated successfully."});
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating semester course with id=" + id
                });
            });
    }else{
        genCourse.findByIdAndUpdate(id, req.body, {useFindAndModify: false, runValidators: true})
            .then(course => {
                if (!course) {
                    res.status(404).send({
                        message: `Cannot update general course with id=${id}. general Course not found!`
                    });
                } else res.send({message: "General Course was updated successfully."});
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating course with id=" + id
                });
            });
    }
};

// Delete a course with the specified id in the request
exports.deleteCourse = async (req, res) => {
    const id = req.params.id;
    if(req.body.courseType === "semester"){
        semCourse.findByIdAndRemove(id)
            .then(course => {
                if (!course) {
                    res.status(404).send({
                        message: `Cannot delete semester course with id=${id}. Course not found!`
                    });
                } else {
                    res.send({
                        message: "Semester Course was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete semester course with id=" + id
                });
            });
    }else {
        const semesterCourseForThisGeneralCourse = await semCourse.findOne({course_name: id});
        if (!semesterCourseForThisGeneralCourse) {
            genCourse.findByIdAndRemove(id)
                .then(course => {
                    if (!course) {
                        res.status(404).send({
                            message: `Cannot delete general course with id=${id}. Course not found!`
                        });
                    } else {
                        res.send({
                            message: "General course was deleted successfully!"
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Could not delete general course with id=" + id
                    });
                });
        } else {
            res.status(406).send({
                message: `Cannot delete general course with id=${id}. Course has some semester courses, delete them first!`
            });
        }
    }
};
