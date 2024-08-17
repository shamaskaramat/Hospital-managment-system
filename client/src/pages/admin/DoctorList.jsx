import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../../redux/Actions/DoctorAction';
import { FaEdit, FaTrash, FaPlus, FaUser, FaSearch, FaCamera } from 'react-icons/fa';

const DoctorList = () => {
    const dispatch = useDispatch();
    const { loading, doctors, error } = useSelector((state) => state.doctorstate);
    const [editDoctor, setEditDoctor] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        email: '',
        fees: '',
        password: '',
        confirmPassword: '',
        departmentName: '',
        role: "doctor",
        doctorPhoto: null
    });

    useEffect(() => {
        dispatch(getDoctors());
    }, [dispatch]);

    const handleAdd = () => {
        const formData = new FormData();
        for (const key in newDoctor) {
            formData.append(key, newDoctor[key]);
        }
        dispatch(addDoctor(formData));
        setShowAddModal(false);
        setNewDoctor({ name: '', email: '', fees: '', password: '', confirmPassword: '', departmentName: '', doctorPhoto: null });
    };

    const handleUpdate = () => {
        if (editDoctor) {
            const formData = new FormData();
            for (const key in editDoctor) {
                formData.append(key, editDoctor[key]);
            }
            dispatch(updateDoctor(editDoctor._id, formData));
            setEditDoctor(null);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            dispatch(deleteDoctor(id));
        }
    };

    const handleFileChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (isEdit) {
            setEditDoctor({ ...editDoctor, doctorPhoto: file });
        } else {
            setNewDoctor({ ...newDoctor, doctorPhoto: file });
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const name = doctor.name ? doctor.name.toLowerCase().trim() : '';
        const email = doctor.email ? doctor.email.toLowerCase().trim() : '';
        const departmentId = doctor.departmentId.name ? doctor.departmentId.name.toLowerCase().trim() : '';
        const search = searchTerm.toLowerCase().trim();

        return name.includes(search) || email.includes(search) || departmentId.name.includes(search);
    });

    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
    </div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Doctors</h2>
                <div className="flex items-center">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add Doctor
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Photo</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Fees</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {filteredDoctors.map(doctor => (
                            <tr key={doctor._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    {doctor.doctorProfile ? (
                                        <img src={doctor.doctorProfile} alt={doctor.name} className="w-14 h-14 rounded-full" />
                                    ) : (
                                        <FaUser className="w-10 h-10 text-gray-400" />
                                    )}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{doctor.name}</td>
                                <td className="py-3 px-6 text-left font-medium">{doctor.email}</td>
                                <td className="py-3 px-6 text-left font-medium">{doctor.fees}</td>
                                <td className="py-3 px-6 text-left font-medium">{doctor.departmentId.name}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button onClick={() => setEditDoctor(doctor)} className="w-4 mr-2 transform text-blue-500 ">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(doctor._id)} className="w-4 mr-2 transform text-red-500 ">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {(showAddModal || editDoctor) && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">{editDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>

                        {/* Photo Input and Preview */}
                        <div className="mb-4 flex flex-col items-center">
                            <label className="relative cursor-pointer">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-gray-300">
                                    {(editDoctor && editDoctor.doctorPhoto) || (newDoctor && newDoctor.doctorPhoto) ? (
                                        <img
                                            src={URL.createObjectURL(editDoctor ? editDoctor.doctorPhoto : newDoctor.doctorPhoto)}
                                            alt="Doctor Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUser className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                                        <FaCamera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, !!editDoctor)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        <input
                            type="text"
                            value={editDoctor ? editDoctor.name : newDoctor.name}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, name: e.target.value }) : setNewDoctor({ ...newDoctor, name: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={editDoctor ? editDoctor.email : newDoctor.email}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, email: e.target.value }) : setNewDoctor({ ...newDoctor, email: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            value={editDoctor ? editDoctor.fees : newDoctor.fees}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, fees: e.target.value }) : setNewDoctor({ ...newDoctor, fees: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Fees"
                        />
                        <input
                            type="password"
                            value={editDoctor ? editDoctor.password : newDoctor.password}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, password: e.target.value }) : setNewDoctor({ ...newDoctor, password: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Password"
                        />
                        {/* <input
                            type="password"
                            value={editDoctor ? editDoctor.confirmPassword : newDoctor.confirmPassword}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, confirmPassword: e.target.value }) : setNewDoctor({ ...newDoctor, confirmPassword: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Confirm Password"
                        /> */}
                        <input
                            type="text"
                            value={editDoctor ? editDoctor.departmentId.name : newDoctor.departmentName}
                            onChange={(e) => editDoctor ? setEditDoctor({ ...editDoctor, departmentName: e.target.value }) : setNewDoctor({ ...newDoctor, departmentName: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-700 placeholder-gray-500"
                            placeholder="Department Name"
                        />
                        <button
                            onClick={editDoctor ? handleUpdate : handleAdd}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {editDoctor ? 'Update' : 'Add'}
                        </button>
                        <button
                            onClick={() => {
                                setEditDoctor(null);
                                setShowAddModal(false);
                            }}
                            className="w-full mt-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorList;
