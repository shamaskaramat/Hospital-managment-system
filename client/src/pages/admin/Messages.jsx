import React from 'react'
import { FaSearch, FaUser, FaEnvelope, FaPhone, FaCommentAlt } from 'react-icons/fa'

const SEARCH_INPUT_CLASSES = 'border border-blue-300 rounded-lg p-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const SEARCH_BUTTON_CLASSES = 'bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-2'
const TABLE_HEADER_CLASSES = 'py-3 px-4 text-left font-semibold text-blue-700 dark:text-blue-200'
const TABLE_ROW_CLASSES = 'py-3 px-4'
const TABLE_ROW_BORDER_CLASSES = 'border-b dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-800 transition duration-150 ease-in-out'

const TableHeader = ({ icon: Icon, text }) => (
    <th className={TABLE_HEADER_CLASSES}>
        <div className="flex items-center">
            <Icon className="mr-2" />
            {text}
        </div>
    </th>
)

const TableCell = ({ children }) => (
    <td className={TABLE_ROW_CLASSES}>{children}</td>
)

const Messages = () => {
    return (
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200">Messages</h2>
            <div className="bg-white dark:bg-blue-800 rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="flex w-full md:w-2/3 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search by contact or name"
                            className={SEARCH_INPUT_CLASSES}
                        />
                        <button className={SEARCH_BUTTON_CLASSES}>
                            <FaSearch className="mr-2 inline" />
                            Search
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-blue-100 dark:bg-blue-700">
                                <TableHeader icon={FaUser} text="User Name" />
                                <TableHeader icon={FaEnvelope} text="Email" />
                                <TableHeader icon={FaPhone} text="Contact" />
                                <TableHeader icon={FaCommentAlt} text="Message" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={TABLE_ROW_BORDER_CLASSES}>
                                <TableCell>Anu</TableCell>
                                <TableCell>anu@gmail.com</TableCell>
                                <TableCell>7896677554</TableCell>
                                <TableCell>Hey Admin</TableCell>
                            </tr>
                            <tr className={TABLE_ROW_BORDER_CLASSES}>
                                <TableCell>Viki</TableCell>
                                <TableCell>viki@gmail.com</TableCell>
                                <TableCell>9899778865</TableCell>
                                <TableCell>Good Job, Pal</TableCell>
                            </tr>
                            {/* Additional rows would go here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Messages