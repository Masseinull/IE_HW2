const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
    try {
        console.log(`role ${req.type}`);
        if(req.type !== 'admin'){
            return res.status(403).json({ error: 'Access denied. You have to be admin to perform this action.' });
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};