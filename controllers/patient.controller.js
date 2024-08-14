import Patient from "../models/patient.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../utils/sendEmails.js";
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import Message from "../models/message.model.js";
import Admin from "../models/admin.model.js";



// Create a new patient
const SALT_ROUNDS = 10;


export const createPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, email, password, role } = req.body;

        if (!name || !age || !gender || !phone || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newPatient = new Patient({
            name,
            age,
            gender,
            phone,
            email,
            role,
            password: hashedPassword
        });
        await newPatient.save();

        res.status(201).json({ success: true, message: 'Patient created successfully', patient: newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all patient list
export const getPatientList = async (req, res) => {
    try {
        const patients = await Patient.find();

        if (patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }

        res.status(200).json({ patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//patient login 

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Email,role and password are required' });
        }

        // Find the patient by email
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({
            id: patient._id,
            permissions: patient.permissions,
            role: patient.role,
            email: patient.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        // Return the token and patient details
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            patient: {
                id: patient._id,
                Name: patient.name,
                email: patient.email,
                permissions: patient.permissions
            },
            role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const generateToken = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };


// Forgot Password

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        patient.otp = OTP;
        patient.otpExpires = Date.now() + 3600000;
        await patient.save();
        // Render the EJS template to HTML
        const htmlContent = await ejs.renderFile(path.join(__dirname, '../views/otp.ejs'), { otp: OTP });
        try {
            await sendMail({
                from: process.env.SMTP_MAIL,
                to: email,
                subject: 'OTP Verification',
                html: htmlContent
            });

            res.status(200).json({
                success: true,
                message: 'OTP sent successfully for password reset.',
            });
        } catch (error) {
            patient.otp = undefined;
            patient.otpExpires = undefined;
            await patient.save();

            res.status(500).json({ message: 'Failed to send OTP email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        if (!otp || !newPassword) {
            return res.status(400).json({ success: false, message: 'OTP and new password are required' });
        }

        const patient = await Patient.findOne({
            otp,
            otpExpires: { $gt: Date.now() },
        });

        if (!patient) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        patient.password = hashedPassword;
        patient.otp = undefined;
        patient.otpExpires = undefined;
        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Messages


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const senderId = req.user.id;

        const email = req.user.email;
        // console.log(senderId, email)


        if (!message) {
            return res.status(400).json({ message: ' Message is  required' });
        }

        // Check if the receiver exists and is an admin
        const receiverId = process.env.RECIVER_ID
        const receiver = await Admin.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            message,
            email
        });

        await newMessage.save();

        // Optionally, you can update the patient and admin documents to include the new message reference

        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};