import React from 'react'
const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden'
const tableCellClass = 'py-3 px-4 border-b'
const AppointmentHistory = () => {
    return (
        <div className="overflow-x-auto w-full px-10 mt-10">
            <h2 className='text-center mb-10 text-3xl font-serif font-bold text-blue-400 '>Wellcome ijaz ahamad</h2>
            <table className={tableClass}>
                <thead>
                    <tr className="bg-blue-100">
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doactor Name</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Consultancy Fees</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(8)].map((_, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className={tableCellClass}>Dr.Hashim</td>
                            <td className={tableCellClass}>800</td>
                            <td className={tableCellClass}>2019-09-22</td>
                            <td className={tableCellClass}>10:00:00</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentHistory