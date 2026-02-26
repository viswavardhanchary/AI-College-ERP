const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.models');
const Student = require('../models/student.models');
const Teacher = require('../models/teacher.models');

const protectAny = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            // Attempt to find the user in all three collections
            const [admin, student, teacher] = await Promise.all([
                Admin.findById(decoded.id).select('-password'),
                Student.findById(decoded.id).select('-password'),
                Teacher.findById(decoded.id).select('-password')
            ]);

            // Filter out null results to see how many identities match this ID
            const matches = [];
            if (admin) matches.push({ type: 'admin', data: admin });
            if (student) matches.push({ type: 'student', data: student });
            if (teacher) matches.push({ type: 'teacher', data: teacher });

            // Strict check: Must match exactly one user type
            if (matches.length === 1) {
                const authorizedUser = matches[0];
                req[authorizedUser.type] = authorizedUser.data;
                req.userType = authorizedUser.type;
                return next();
            } 
            
            if (matches.length > 1) {
                return res.status(401).json({ 
                    message: 'Not authorized: Ambiguous identity, multiple account types matched' 
                });
            }

            return res.status(401).json({ message: 'Not authorized: User not found' });

        } catch (error) {
            return res.status(401).json({ message: 'Not authorized: Token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized: No token provided' });
    }
};

module.exports = { protectAny };