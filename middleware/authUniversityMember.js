const jwt = require("jsonwebtoken");

exports.isUniversityMember = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
            if(req.type === 'admin'){
                return res.status(403).json({ error: 'admin have no access to courses' });
            }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};