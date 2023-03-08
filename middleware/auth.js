const jwt = require('jsonwebtoken');
const User = require('../model/user');

//protected routes
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) res.status(501).json({ message: 'Not Authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        res.locals.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(501).json({ message: 'Not Authorized' });
    }
}