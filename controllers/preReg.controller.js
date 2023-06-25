const Term = require('../models/teacher.model');
const PreRegReq = require('../models/preRegistrationReq.model');

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
