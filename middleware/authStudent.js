const jwt = require("jsonwebtoken");

exports.isThisStudent = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type !== 'student'){
            if(req.type === 'admin'){
                return res.status(403).json({ error: 'admin have to request another route /admin/student' });
            }
            return res.status(403).json({ error: 'Access denied. You have to be student to perform this action.' });
        }
        if(req.id !== req.params.id){
            return res.status(403).json({ error: `Access denied. You have to be student with id ${req.params.id} to perform this action. but you are student id ${req.id}.` });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
exports.isStudent = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type !== 'student'){
            return res.status(403).json({ error: 'Access denied. You have to be student to perform this action.' });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};