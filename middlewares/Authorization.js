// export const authorize = (requiredPermissions) => {
//     return (req, res, next) => {
//         const user = req.user;

//         if (!user) return res.status(401).json({ message: 'Unauthorized' });

//         const hasPermission = requiredPermissions.every(permission => user.permissions[permission]);
//         if (!hasPermission) return res.status(403).json({ message: 'Forbidden' });

//         next();
//     };
// };



import jwt from 'jsonwebtoken';
import Patient from '../models/patient.model.js';
import Admin from '../models/admin.model.js';
import Doctor from '../models/doctor.model.js';

// Middleware to check if the user has permission
export const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'No token provided' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user;

            if (decoded.role === 'admin') {
                user = await Admin.findById(decoded.id);
            }
            if (decoded.role === 'doctor') {
                user = await Doctor.findById(decoded.id);
            }
            else if (decoded.role === 'patient') {
                user = await Patient.findById(decoded.id);
            }

            if (!user) return res.status(404).json({ message: 'User not found' });

            if (user.permissions[requiredPermission] === false) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            req.user = user; // Attach user to request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};



