const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher.models');

const protectTeacher = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.teacher = await Teacher.findById(decoded.id).select('-password');
            
            if (!req.teacher) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token' });
    }
};

module.exports = { protectTeacher };