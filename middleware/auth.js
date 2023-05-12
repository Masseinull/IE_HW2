const jwt = require("jsonwebtoken");

const config = process.env;
exports.verifyToken = async (req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    const header = req.headers.authorization;
    if (!header) {
        return res.status(403).send("A token is required for authentication");
    }
    const token = header.split(' ')[1];
    const secret =  config.JWT_SECRET || 'secret-salt';
    try {
        const decoded = await jwt.verify(token, secret);
        req.id = decoded.user.id;
        req.type = decoded.user.type;
        if(req.type === "teacher" || req.type === "student"){
            req.field = decoded.user.field;
        }
        console.log(`id: ${req.id}`);
        console.log(`role: ${req.type}`);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
