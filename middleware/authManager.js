const jwt = require("jsonwebtoken");

exports.isManager = async (req, res, next) => {
    try {
        // console.log(`role ${req.type}`);
        if(req.type !== 'educationalManager'){
            if(req.type === 'admin'){
                return res.status(403).json({ error: 'admin have to request another route starting by /admin.' });
            }
            return res.status(403).json({ error: 'Access denied. You have to be educational manager to perform this action.' });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};