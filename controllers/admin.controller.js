import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import Message from '../models/message.model.js';


// Create Admin
export const createAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });

        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            email,
            password: hashedPassword,
            role

        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Admin
export const LoginAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });

        }

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, permissions: admin.permissions, role: admin.role },
            process.env.JWT_SECRET || 'sdhhjdvhjvkoa', // Provide a default secret if needed
            { expiresIn: process.env.JWT_EXPIRE || '1h' } // Provide a default expiration time if needed
        );
        res.json({
            success: true,
            token,
            role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get all messages from patients


export const getMessagesForAdmin = async (req, res) => {
    try {
        const adminId = process.env.RECIVER_ID;
        // console.log(adminId)


        const messages = await Message.find({ receiver: adminId }).sort({ sentAt: -1 }).populate('sender', 'name email');

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};