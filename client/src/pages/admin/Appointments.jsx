import React from 'react'
import { FaCalendarAlt, FaSearch } from 'react-icons/fa'

const inputClass = 'border border-zinc-300 rounded-lg p-2 flex-grow'
const buttonClass = 'bg-blue-600 text-white p-2 rounded-lg ml-2 hover:bg-blue-700 transition-colors duration-200 flex items-center'
const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden'
const tableCellClass = 'py-3 px-4 border-b'

const Appointments = () => {
    return (
        <div className="flex-1 p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Appointment Details
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6 flex w-1/2">
                    <input type="text" placeholder="Search by contact" className={inputClass} />
                    <button className={buttonClass}>
                        <FaSearch className="mr-2" />
                        Search
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className={tableClass}>
                        <thead>
                            <tr className="bg-blue-100">
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>First Name</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Last Name</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Email</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Contact</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doctor Name</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Consultancy Fees</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className={tableCellClass}>Ram</td>
                                    <td className={tableCellClass}>Kumar</td>
                                    <td className={tableCellClass}>ram@gmail.com</td>
                                    <td className={tableCellClass}>7896543210</td>
                                    <td className={tableCellClass}>Arun</td>
                                    <td className={tableCellClass}>600</td>
                                    <td className={tableCellClass}>2019-09-22</td>
                                    <td className={tableCellClass}>10:00:00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Appointments