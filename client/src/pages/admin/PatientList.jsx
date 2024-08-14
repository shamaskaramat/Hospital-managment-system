

import React from 'react'
import { FaUserMd, FaSearch, FaUserInjured, FaCalendarAlt, FaUserPlus, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'

const inputClass = 'border border-zinc-300 rounded-lg p-2 w-1/2'
const buttonClass = 'bg-blue-600 text-white p-2 rounded-lg ml-2 flex items-center'
const tableClass = 'min-w-full bg-white border border-zinc-300'
const cellClass = 'py-2 px-4 border-b'

// const PatientList = () => {
//     return (
//         <div className="p-4">
//             <div className="mb-4">
//                 <input type="text" placeholder="Enter Contact" className={inputClass} />
//                 <button className={buttonClass}>Search</button>
//             </div>
//             <table className={tableClass}>
//                 <thead>
//                     <tr className="bg-zinc-100">
//                         <th className={cellClass}>First Name</th>
//                         <th className={cellClass}>Last Name</th>
//                         <th className={cellClass}>Email</th>
//                         <th className={cellClass}>Contact</th>
//                         <th className={cellClass}>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td className={cellClass}>Ram</td>
//                         <td className={cellClass}>Kumar</td>
//                         <td className={cellClass}>ram@gmail.com</td>
//                         <td className={cellClass}>7896543210</td>
//                         <td className={cellClass}>ram123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Alia</td>
//                         <td className={cellClass}>Bhat</td>
//                         <td className={cellClass}>alia@gmail.com</td>
//                         <td className={cellClass}>8787989800</td>
//                         <td className={cellClass}>alia123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Shahrukh</td>
//                         <td className={cellClass}>Khan</td>
//                         <td className={cellClass}>shahrukh@gmail.com</td>
//                         <td className={cellClass}>7978797800</td>
//                         <td className={cellClass}>shahrukh123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Kishan</td>
//                         <td className={cellClass}>Lal</td>
//                         <td className={cellClass}>kishansmart10@gmail.com</td>
//                         <td className={cellClass}>9876543210</td>
//                         <td className={cellClass}>kishan123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Gautam</td>
//                         <td className={cellClass}>Shankarararam</td>
//                         <td className={cellClass}>gautam@gmail.com</td>
//                         <td className={cellClass}>9999999999</td>
//                         <td className={cellClass}>gautam123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Sushant</td>
//                         <td className={cellClass}>Singh</td>
//                         <td className={cellClass}>sushant@gmail.com</td>
//                         <td className={cellClass}>8887778887</td>
//                         <td className={cellClass}>sushant123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Nancy</td>
//                         <td className={cellClass}>Deborah</td>
//                         <td className={cellClass}>nancy@gmail.com</td>
//                         <td className={cellClass}>9898989898</td>
//                         <td className={cellClass}>nancy123</td>
//                     </tr>
//                     <tr>
//                         <td className={cellClass}>Kenny</td>
//                         <td className={cellClass}>Sebastian</td>
//                         <td className={cellClass}>kenny@gmail.com</td>
//                         <td className={cellClass}>8797686769</td>
//                         <td className={cellClass}>kenny123</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }
const PatientList = () => {
    return (
        <div className="flex-1 p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <FaUserInjured className="mr-2" />
                Patient List
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6 flex">
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
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>First Name</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Last Name</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Email</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Contact</th>
                                <th className={`${cellClass} font-semibold text-left text-blue-700`}>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cellClass}>Ram</td>
                                <td className={cellClass}>Kumar</td>
                                <td className={cellClass}>ram@gmail.com</td>
                                <td className={cellClass}>7896543210</td>
                                <td className={cellClass}>ram123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Alia</td>
                                <td className={cellClass}>Bhat</td>
                                <td className={cellClass}>alia@gmail.com</td>
                                <td className={cellClass}>8787989800</td>
                                <td className={cellClass}>alia123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Shahrukh</td>
                                <td className={cellClass}>Khan</td>
                                <td className={cellClass}>shahrukh@gmail.com</td>
                                <td className={cellClass}>7978797800</td>
                                <td className={cellClass}>shahrukh123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Kishan</td>
                                <td className={cellClass}>Lal</td>
                                <td className={cellClass}>kishansmart10@gmail.com</td>
                                <td className={cellClass}>9876543210</td>
                                <td className={cellClass}>kishan123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Gautam</td>
                                <td className={cellClass}>Shankarararam</td>
                                <td className={cellClass}>gautam@gmail.com</td>
                                <td className={cellClass}>9999999999</td>
                                <td className={cellClass}>gautam123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Sushant</td>
                                <td className={cellClass}>Singh</td>
                                <td className={cellClass}>sushant@gmail.com</td>
                                <td className={cellClass}>8887778887</td>
                                <td className={cellClass}>sushant123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Nancy</td>
                                <td className={cellClass}>Deborah</td>
                                <td className={cellClass}>nancy@gmail.com</td>
                                <td className={cellClass}>9898989898</td>
                                <td className={cellClass}>nancy123</td>
                            </tr>
                            <tr>
                                <td className={cellClass}>Kenny</td>
                                <td className={cellClass}>Sebastian</td>
                                <td className={cellClass}>kenny@gmail.com</td>
                                <td className={cellClass}>8797686769</td>
                                <td className={cellClass}>kenny123</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PatientList