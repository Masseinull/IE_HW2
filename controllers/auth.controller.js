const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// Login function for all types of users
 exports.login = async (req, res) => {
    try {
        const { id, password } = req.body;
        let user = await User.findOne({ _id : id });
        if(!user){
            return res.status(401).json({ error: 'Invalid user' });
        }
        let userType = user.type;
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const payLoad = {
            user: {
                id: user._id,
                type: userType
            }
        };
        const secret = process.env.JWT_SECRET || "secret-salt";
        const token = await jwt.sign(
            payLoad,
            secret,
            { expiresIn: 3600 }
    );
        res.json({ token });
        // console.log(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
