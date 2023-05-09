const jwt = require("jsonwebtoken");

const config = process.env;
global.client_id = -1;
global.client_type = "";
exports.verifyToken = async (req, res, next) => {
    const token = req.headers.Authorization.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        client_id = req.user._id;
        client_type = req.user.type;
        console.log(`id: ${client_id}`);
        console.log(`role: ${client_type}`);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
