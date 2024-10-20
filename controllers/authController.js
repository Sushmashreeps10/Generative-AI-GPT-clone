const userModel = require('../models/userModel');

// JWT Token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    });
};

// REGISTER
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new Error('Email is already registered', 500));
        }

        const user = new userModel({ username, email, password });
        exports.sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new Error('Please provide email or password', 400));
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new Error('Invalid Credentials', 401));
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new Error('Invalid Credentials', 401));
        }

        exports.sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// LOGOUT
exports.logoutController = (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully'
    });
};
