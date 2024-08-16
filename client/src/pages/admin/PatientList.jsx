import React, { useEffect, useState } from 'react';
import { FaUserInjured, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientList } from '../../redux/Actions/PatientAction';

const inputClass = 'border border-zinc-300 rounded-lg p-2 w-1/2';
const buttonClass = 'bg-blue-600 text-white p-2 rounded-lg ml-2 flex items-center';
const tableClass = 'min-w-full bg-white border border-zinc-300';
const cellClass = 'py-2 px-4 border-b';

const PatientList = () => {
    const dispatch = useDispatch();
    const { patients, status, error } = useSelector((state) => state.patientsList); // Default to empty array
    console.log(patients);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(10); // Number of records per page
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPatientList());
        }
    }, [dispatch, status]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    // Filtered and paginated patients
    const filteredPatients = patients?.filter((patient) =>
        (patient?.contact || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="flex-1 p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <FaUserInjured className="mr-2" />
                Patient List
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* <div className="mb-6 flex">
                    <input
                        type="text"
                        placeholder="Search by contact"
                        className={inputClass}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className={buttonClass}>
                        <FaSearch className="mr-2" />
                        Search
                    </button>
                </div> */}
                <div className="overflow-x-auto">
                    <table className={tableClass}>
                        <thead>
                            <tr className="bg-blue-100">
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}> Name</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Email</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>age</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Gender</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.length > 0 ? (
                                currentPatients.map((patient, index) => (
                                    <tr key={patient.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className={cellClass}>{patient?.Name || "N/A"}</td>
                                        <td className={cellClass}>{patient?.email || "N/A"}</td>
                                        <td className={cellClass}>{patient?.age || "N/A"}</td>
                                        <td className={cellClass}>{patient?.gender || "N/A"}</td>
                                        <td className={cellClass}>{patient?.phoneNumber || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 px-4 text-center">No patients found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        className="bg-blue-600 text-white p-2 rounded-lg"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        className="bg-blue-600 text-white p-2 rounded-lg"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * patientsPerPage >= filteredPatients.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
