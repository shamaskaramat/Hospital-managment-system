import Department from "../models/department.model.js";
import Doctor from "../models/doctor.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import cloudinary from "../upload/cloudinaryConfig.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config();



// Create a new doctor
// export const createDoctor = async (req, res) => {
//     try {
//         const { name, email, fees, password, confirmPassword, departmentId, role } = req.body;
//         // const doctorPhoto = req.file ? req.file.path : null;
//         // const doctorProfile = doctorPhoto.single('doctors')
//         if (!name || !email || !departmentId || !fees || !password || !confirmPassword || !role) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ message: 'Invalid email format' });
//         }

//         const validatePasswordConfirmation = (password, confirmPassword) => {
//             return password === confirmPassword;
//         };

//         if (!validatePasswordConfirmation(password, confirmPassword)) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newDoctor = new Doctor({
//             name,
//             email,
//             fees,
//             password: hashedPassword,
//             departmentId,
//             role,
//         });

//         await newDoctor.save();
//         await Department.findByIdAndUpdate(
//             departmentId,
//             { $push: { doctors: newDoctor._id } },
//             { new: true }
//         );
//         res.status(201).json(newDoctor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(fileBuffer);
    });
};

// export const createDoctor = async (req, res) => {
//     try {
//         const { name, email, fees, password, confirmPassword, departmentId, role } = req.body;
//         const doctorPhoto = req.file;

//         if (!name || !email || !departmentId || !fees || !password || !confirmPassword || !role) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ message: 'Invalid email format' });
//         }

//         const validatePasswordConfirmation = (password, confirmPassword) => {
//             return password === confirmPassword;
//         };

//         if (!validatePasswordConfirmation(password, confirmPassword)) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Upload to Cloudinary
//         let doctorProfileUrl = null;
//         if (doctorPhoto) {
//             const uploadResult = await cloudinary.uploader.upload_stream(
//                 { folder: 'doctors' },
//                 (error, result) => {
//                     if (error) {
//                         throw new Error('Error uploading to Cloudinary');
//                     }
//                     doctorProfileUrl = result.secure_url;
//                 }
//             );

//             // Convert buffer to stream for Cloudinary
//             const stream = new Readable();
//             stream.push(doctorPhoto.buffer);
//             stream.push(null);
//             stream.pipe(uploadResult);
//         }

//         const newDoctor = new Doctor({
//             name,
//             email,
//             fees,
//             password: hashedPassword,
//             departmentId,
//             role,
//             doctorProfile: doctorProfileUrl
//         });

//         await newDoctor.save();
//         await Department.findByIdAndUpdate(
//             departmentId,
//             { $push: { doctors: newDoctor._id } },
//             { new: true }
//         );
//         res.status(201).json(newDoctor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

//get all doctors

// export const createDoctor = async (req, res) => {
//     try {
//         const { name, email, fees, password, confirmPassword, departmentId, role } = req.body;

//         if (!name || !email || !departmentId || !fees || !password || !confirmPassword || !role) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         let doctorPhotoUrl = null;
//         if (req.file) {
//             const result = await uploadToCloudinary(req.file.buffer);
//             doctorPhotoUrl = result.secure_url;
//         }

//         const newDoctor = new Doctor({
//             name,
//             email,
//             fees,
//             password: hashedPassword,
//             departmentId,
//             role,
//             doctorProfile: doctorPhotoUrl
//         });

//         await newDoctor.save();
//         await Department.findByIdAndUpdate(
//             departmentId,
//             { $push: { doctors: newDoctor._id } },
//             { new: true }
//         );
//         res.status(201).json(newDoctor);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// };

export const createDoctor = async (req, res) => {
    try {
        const { name, email, fees, password, confirmPassword, departmentName, role } = req.body;

        if (!name || !email || !departmentName || !fees || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Find department by name
        const department = await Department.findOne({ name: departmentName });
        if (!department) {
            return res.status(400).json({ message: 'Department not found' });
        }

        let doctorPhotoUrl = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            doctorPhotoUrl = result.secure_url;
        }

        // Create the doctor
        const newDoctor = new Doctor({
            name,
            email,
            fees,
            password: hashedPassword,
            departmentId: department._id, // Use department ID
            role,
            doctorProfile: doctorPhotoUrl
        });

        await newDoctor.save();

        // Update the department with the doctor's name
        await Department.findByIdAndUpdate(
            department._id,
            { $push: { doctors: name } }, // Push doctor's name into the doctors array
            { new: true }
        );

        res.status(201).json(newDoctor);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate({
                path: 'departmentId',
                select: 'name'
            });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


//delete a doctor

export const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;

        const doctor = await Doctor.findByIdAndDelete(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await Department.findByIdAndUpdate(
            doctor.departmentId,
            { $pull: { doctors: doctorId } },
            { new: true }
        );

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//login doctor 
export const loginDoctor = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: doctor._id, email: doctor.email, permissions: doctor.permissions, role: doctor.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                fees: doctor.fees
            },
            token,
            role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// // Update doctor details
// export const updateDoctor = async (req, res) => {
//     try {
//         const doctorId = req.params.id;
//         const { name, email, fees, password, confirmPassword, departmentName, role } = req.body;
//         const doctorPhoto = req.file;

//         // Find doctor by ID
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }

//         // Update password if provided and confirmPassword matches
//         if (password) {
//             if (password !== confirmPassword) {
//                 return res.status(400).json({ message: 'Passwords do not match' });
//             }
//             doctor.password = await bcrypt.hash(password, 10);
//         }

//         // Update other fields
//         if (name) doctor.name = name;
//         if (email) doctor.email = email;
//         if (fees) doctor.fees = fees;
//         if (role) doctor.role = role;

//         // Update department if provided
//         if (departmentName) {
//             const department = await Department.findOne({ name: departmentName });
//             if (!department) {
//                 return res.status(400).json({ message: 'Department not found' });
//             }
//             doctor.departmentId = department._id;
//         }

//         // Handle photo upload if a new one is provided
//         if (doctorPhoto) {
//             const result = await uploadToCloudinary(doctorPhoto.buffer);
//             doctor.doctorProfile = result.secure_url;
//         }

//         // Save the updated doctor
//         await doctor.save();

//         // If department ID was updated, ensure department's doctor list is updated
//         if (departmentName) {
//             // Ensure the previous department is updated to remove the doctor if needed
//             await Department.findByIdAndUpdate(
//                 doctor.departmentId,
//                 { $pull: { doctors: doctorId } },
//                 { new: true }
//             );
//             // Add the doctor to the new department
//             await Department.findByIdAndUpdate(
//                 department._id,
//                 { $push: { doctors: doctorId } },
//                 { new: true }
//             );
//         }

//         res.status(200).json(doctor);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// };







// Update doctor details
export const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { name, email, fees, password, departmentName, role } = req.body;
        const doctorPhoto = req.file;

        // Find the doctor by ID
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Prepare update data
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (fees) updateData.fees = fees;
        if (role) updateData.role = role;
        // if (password) updateData.password = await bcrypt.hash(password, 10)
        // if (password) updateData.password = password

        // Update password if provided and confirmPassword matches
        if (password) {
            // if (password !== confirmPassword) {
            //     return res.status(400).json({ message: 'Passwords do not match' });
            // }
            updateData.password = await bcrypt.hash(password, 10);
        }

        // Handle photo upload if a new one is provided
        if (doctorPhoto) {
            const result = await uploadToCloudinary(doctorPhoto.buffer);
            updateData.doctorProfile = result.secure_url;
        }

        // If departmentName is provided, find the new department
        if (departmentName) {
            const newDepartment = await Department.findOne({ name: departmentName });
            if (!newDepartment) {
                return res.status(400).json({ message: 'Department not found' });
            }

            // Ensure the previous department is updated to remove the doctor if needed
            if (doctor.departmentId) {
                await Department.findByIdAndUpdate(
                    doctor.departmentId,
                    { $pull: { doctors: doctorId } },
                    { new: true }
                );
            }

            // Update the doctor's department ID and push doctor to the new department
            updateData.departmentId = newDepartment._id;
            await Department.findByIdAndUpdate(
                newDepartment._id,
                { $push: { doctors: doctorId } },
                { new: true }
            );
        }

        // Update the doctor document with the new data
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found or failed to update' });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor updated successfully',
            updatedDoctor
        });
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(400).json({ message: error.message });
    }
};
