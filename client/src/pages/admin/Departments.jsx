import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments, updateDepartment, deleteDepartment, addDepartment } from '../../redux/Actions/DepartmentAction';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Departments = () => {
    const dispatch = useDispatch();
    const { loading, departments, error } = useSelector((state) => state.department);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [editDept, setEditDept] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDept, setNewDept] = useState({ name: '', description: '' });

    useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    const handleUpdate = () => {
        if (editDept) {
            dispatch(updateDepartment(editDept._id, editDept));
            setEditDept(null);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            dispatch(deleteDepartment(id));
        }
    };

    const handleAdd = () => {
        dispatch(addDepartment(newDept));
        setShowAddModal(false);
        setNewDept({ name: '', description: '' });
    };

    if (loading) return <div className="flex justify-center items-center h-screen px-96 ml-96 ">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
    </div>;

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Departments</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Department
                </button>
            </div>

            <div className="mb-6">
                <label htmlFor="departmentSelect" className="block text-sm font-medium text-gray-700 mb-2">Select Department:</label>
                <select
                    id="departmentSelect"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments
                    .filter(dept => !selectedDepartment || dept._id === selectedDepartment)
                    .map(dept => (
                        <div key={dept._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <div className="absolute top-2 right-2 flex">
                                <button
                                    onClick={() => setEditDept(dept)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(dept._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                            <div className="px-6 py-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{dept.name}</h3>
                                <p className="text-gray-600 mb-4">{dept.description}</p>
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Doctors:</h4>
                                    {dept.doctors.length > 0 ? (
                                        <ul className="list-disc list-inside">
                                            {dept.doctors.map(d => (
                                                <li key={d} className="text-gray-600">{d}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 italic">No doctors assigned</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {editDept && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Department</h3>
                        <input
                            type="text"
                            value={editDept.name}
                            onChange={(e) => setEditDept({ ...editDept, name: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                            placeholder="Department Name"
                        />
                        <textarea
                            value={editDept.description}
                            onChange={(e) => setEditDept({ ...editDept, description: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                            placeholder="Department Description"
                        />
                        <button
                            onClick={handleUpdate}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setEditDept(null)}
                            className="w-full mt-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
                        <input
                            type="text"
                            value={newDept.name}
                            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                            placeholder="Department Name"
                        />
                        <textarea
                            value={newDept.description}
                            onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                            placeholder="Department Description"
                        />
                        <button
                            onClick={handleAdd}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Department
                        </button>
                        <button
                            onClick={() => setShowAddModal(false)}
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

export default Departments;