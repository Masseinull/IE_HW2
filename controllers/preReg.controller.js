const Term = require('../models/teacher.model');
const PreRegReq = require('../models/preRegistrationReq.model');

exports.termBasedPreRegistrations = async (req, res) => {
    const termId = req.params.id;
    try {
        PreRegReq.find({term_id: termId})
            .then(preRegRequest => {
                if (preRegRequest){
                    res.status(200).send(preRegRequest);
                }else{
                    res.status(404).json({message: 'Pre registration requests not found in this term'});
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving requests of pre registration.'
                });
            });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.courseBasedPreRegistrations = async (req, res) => {

};