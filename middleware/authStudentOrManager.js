const jwt = require("jsonwebtoken");

exports.isStudentOrManager = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type === 'admin' || req.type === 'teacher'){
            return res.status(403).json({ error: 'admin and professors have no access to courses' });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};