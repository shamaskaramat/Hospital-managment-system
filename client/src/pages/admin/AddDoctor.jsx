import React, { useState } from 'react';
import { FaUserMd, FaLock, FaEnvelope, FaMoneyBillWave, FaCamera, FaUser } from 'react-icons/fa';

const sharedClasses = {
    flexRow: 'flex flex-col md:flex-row md:items-center md:space-x-4 mb-6',
    inputWrapper: 'flex-1 relative',
    label: 'block text-sm font-medium text-gray-700 mb-2 md:mb-0 md:w-1/4',
    input: 'w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200',
    icon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
    button: 'w-full md:w-auto mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold text-lg',
    profilePhotoWrapper: 'relative w-32 h-40 md:w-40 md:h-48',
    profilePhoto: 'w-full h-full object-cover rounded-lg border-4 border-blue-200 shadow-lg',
    fileInput: 'absolute inset-0 opacity-0 cursor-pointer z-10',
    cameraIcon: 'absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300',
}

const InputField = ({ label, id, type, placeholder, icon: Icon, value, onChange }) => (
    <div className={sharedClasses.flexRow}>
        <label htmlFor={id} className={sharedClasses.label}>
            {label}
        </label>
        <div className={sharedClasses.inputWrapper}>
            <Icon className={sharedClasses.icon} />
            <input
                type={type}
                id={id}
                className={sharedClasses.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        doctorName: '',
        email: '',
        password: '',
        confirmPassword: '',
        consultancyFees: '',
    });
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            ...formData,
            profilePhoto: profilePhoto ? 'Photo uploaded' : 'No photo'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl mt-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0 md:w-2/3">Add New Doctor</h2>
                <div className={`${sharedClasses.profilePhotoWrapper} mx-auto md:mx-0`}>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile-photo"
                        className={sharedClasses.fileInput}
                        onChange={handleFileChange}
                    />
                    <div className="relative w-full h-full">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className={sharedClasses.profilePhoto} />
                        ) : (
                            <div className={`${sharedClasses.profilePhoto} flex items-center justify-center bg-gray-100`}>
                                <FaUser className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                        <FaCamera className={sharedClasses.cameraIcon} />
                    </div>
                </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField
                    label="Doctor Name"
                    id="doctorName"
                    type="text"
                    placeholder="Dr. Manoj Kumar"
                    icon={FaUserMd}
                    value={formData.doctorName}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Email ID"
                    id="email"
                    type="email"
                    placeholder="manoj@example.com"
                    icon={FaEnvelope}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="********"
                    icon={FaLock}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    icon={FaLock}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Consultancy Fees"
                    id="consultancyFees"
                    type="text"
                    placeholder="650"
                    icon={FaMoneyBillWave}
                    value={formData.consultancyFees}
                    onChange={handleInputChange}
                />
                <div className="flex justify-center md:justify-end">
                    <button type="submit" className={sharedClasses.button}>
                        Add Doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;