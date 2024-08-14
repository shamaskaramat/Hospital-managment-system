
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.model.js';


export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'jbjkFBAjklfbKMLSALMS', (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

// authentical patient

export const authenticatePatient = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patient = await Patient.findById(decoded.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        req.user = patient; // Set patient info on req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
