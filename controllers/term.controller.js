const db = require("../models/index");
const Term = db.term;
exports.createTerm = async (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Term

    const term = new Term({
        term_id: req.body.term_id,
        users_id: req.body.users_id,
        semester_courses: req.body.semester_courses,
        current_term: req.body.current_term,
    });

    // Save student in the databases (user and student)
    term
        .save(term)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the term."
                // term
            });
        });
};

exports.findAllTerms = (req, res) => {
    Term.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving terms."
            });
        });
};

exports.getTermById = (req, res) => {
    const id = req.params.id;
    Term.findById(id)
        .then((term) => {
            if (term) {
                res.status(200).json(term);
            } else {
                res.status(404).json({ message: 'Term not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};

exports.updateTermById = async (req, res) => {
    const id = req.params.id;
    Term.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((term) => {
            if (term) {
                res.status(200).json(term);
            } else {
                res.status(404).json({ message: 'Term not found' });
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


exports.deleteTermById = (req, res) => {
    const id = req.params.id;
    Term.findByIdAndDelete(id)
        .then((term) => {
            if (term) {
                res.status(200).json(term);
            } else {
                res.status(404).json({ message: 'Term not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};