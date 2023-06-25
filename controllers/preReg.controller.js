const Term = require('../models/teacher.model');
const PreRegReq = require('../models/preRegistrationReq.model');
const Student = require('../models/student.model');
const preRegCourse = require('../models/preRegCourse.model');

exports.termBasedPreRegistrations = async (req, res) => {
    const termId = req.params.id;
    try {
        if (req.type === 'educationalManager') {
            PreRegReq.find({term_id: termId})
                .then(preRegRequest => {
                    if (preRegRequest) {
                        res.status(200).json(preRegRequest);
                    } else {
                        res.status(404).json({message: 'Pre registration requests not found in this term'});
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving requests of pre registration.'
                    });
                });
        }else{
            const student_id = req.id;
            PreRegReq.find({term_id: termId, requesterId: student_id})
                .then(preRegRequest => {
                    if (preRegRequest) {
                        res.status(200).json(preRegRequest);
                    } else {
                        res.status(404).json({message: `Pre registration requests not found for student ${req.id}`});
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving requests of pre registration.'
                    });
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Server error'});
    }
};

exports.courseBasedPreRegistrations = async (req, res) => {
    try {
        const courseId = req.params.id;
        const currentTerm = await Term.findOne({current_term: true});

        if (!currentTerm) {
            return res.status(404).json({message: "Current term not found"});
        }

        PreRegReq.find({
            term_id: currentTerm.term_name,
            semester_courses: {$elemMatch: {$eq: courseId}}
        })
            .then(preRegistrations => {
                res.status(200).json(preRegistrations);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving requests of pre registration.'
                });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


exports.preregisterCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        const currentTerm = await Term.findOne({ current_term: true });

        if (!currentTerm) {
            return res.status(404).json({ error: 'Current term not found' });
        }
        const course = await preRegCourse.findOne({
            term_id: currentTerm.term_id,
            'semester_courses.course': courseId
        });
        const student = await Student.findById(req.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found in pre registeration courses' });
        }


        const preregistrationRequest = await PreRegReq.findOne({
            term_id: currentTerm.term_id,
            requesterId: student._id
        })
        if (!preregistrationRequest) {
            preregistrationRequest = new PreRegReq({
                term_id: currentTerm.term_id,
                requesterId: student._id,
                semester_courses: []
            });

            await preregistrationRequest.save();
        }
        preregistrationRequest.semester_courses.push(courseId);
        await preregistrationRequest.save();


        const c = course.semester_courses.find(course => course.course_name === courseId);
        c.requests += 1;

        await c.save();

        return res.status(200).json({ message: 'Course added to student\'s preregistration list' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
