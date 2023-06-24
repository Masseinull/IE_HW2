const jwt = require("jsonwebtoken");

exports.isThisTeacher = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type !== 'teacher'){
            if(req.type === 'admin'){
                return res.status(403).json({ error: 'admin have to request another route /admin/Professor' });
            }
            return res.status(403).json({ error: 'Access denied. You have to be professor to perform this action.' });
        }
        if(req.id !== req.params.id){
            return res.status(403).json({ error: `Access denied. You have to be professor with id ${req.params.id} to perform this action. but you are professor id ${req.id}.` });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

exports.isTeacher = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type !== 'teacher'){
            return res.status(403).json({ error: 'Access denied. You have to be admin to perform this action.' });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};