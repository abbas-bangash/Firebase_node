const User = require('../model/user');

// @desc Sign up User
// @route POST /v1/auth/signup
// @access Public
exports.signup = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        const user = await User.create({
            email,
            password
        });
        const token = user.getSignedJwtToken();
        res.status(200).json({ success: true, token });
    }
    else res.status(200).json({ message: 'User with the provided email already exists' });

};

// @desc Sign in User
// @route POST /v1/auth/signin
// @access Public
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({
        email: email,
        password: password
    });
    if (!user) res.status(401).json({ success: false, message: "Invalid credentials" });
    else {
        const token = user.getSignedJwtToken();
        res.status(200).json({ success: true, token });
    }

};