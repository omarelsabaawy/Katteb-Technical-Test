const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('X-Authorization-Token');

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized - No token provided',
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({
                message: 'Unauthorized - Invalid user',
            });
        }

        // Check if the user exists
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized - Invalid user',
            });
        }

        // Attach the user information to the request object for later use
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized - Invalid token',
        });
    }
};

module.exports = authenticateUser;
