// import React from 'react'
// import { FaUserMd, FaLock, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa'

// // Shared Tailwind CSS classes
// const inputClasses = 'mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
// const labelClasses = 'block text-sm font-medium text-gray-700'
// const buttonClasses = 'bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'

// const InputField = ({ label, id, type, placeholder, icon: Icon }) => (
//     <div className="mb-4 flex items-center">
//         <label className={labelClasses} htmlFor={id} style={{ flex: '1' }}>
//             {label}
//         </label>
//         <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Icon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//                 className={`${inputClasses} pl-10`}
//                 type={type}
//                 id={id}
//                 placeholder={placeholder}
//             />
//         </div>
//     </div>
// )

// // const AddDoctor = () => {
// //     return (
// //         <div className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
// //             <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Add New Doctor</h2>
// //             <form className="space-y-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <InputField
// //                         label="Doctor Name"
// //                         id="doctor-name"
// //                         type="text"
// //                         placeholder="Dr. Manoj Kumar"
// //                         icon={FaUserMd}
// //                     />
// //                     <InputField
// //                         label="Email ID"
// //                         id="email"
// //                         type="email"
// //                         placeholder="manoj@example.com"
// //                         icon={FaEnvelope}
// //                     />
// //                     <InputField
// //                         label="Password"
// //                         id="password"
// //                         type="password"
// //                         placeholder="********"
// //                         icon={FaLock}
// //                     />
// //                     <InputField
// //                         label="Confirm Password"
// //                         id="confirm-password"
// //                         type="password"
// //                         placeholder="********"
// //                         icon={FaLock}
// //                     />
// //                     <InputField
// //                         label="Consultancy Fees"
// //                         id="consultancy-fees"
// //                         type="text"
// //                         placeholder="650"
// //                         icon={FaMoneyBillWave}
// //                     />
// //                 </div>
// //                 <div className="text-center mt-8">
// //                     <button className={buttonClasses}>
// //                         Add Doctor
// //                     </button>
// //                 </div>
// //             </form>
// //             {/* <p className="text-green-500 mt-4 text-center">Passwords matching</p> */}
// //         </div>
// //     )
// // }

// // export default AddDoctor

// // import React from 'react'
// const sharedClasses = {
//     flexCol: 'flex flex-col',
//     flexRow: 'md:flex-row',
//     padding: 'p-6',
//     background: 'bg-background',
//     fullWidth: 'w-full',
//     oneThird: 'md:w-1/3',
//     twoThird: 'md:w-2/3',
//     paddingSmall: 'p-4',
//     textLarge: 'text-lg',
//     fontSemiBold: 'font-semibold',
//     marginTop: 'mt-4',
//     spaceY: 'space-y-2',
//     block: 'block',
//     paddingInput: 'p-2',
//     rounded: 'rounded-lg',
//     hoverEffect: 'hover:bg-secondary/80',
//     border: 'border',
//     borderGray: 'border-border',
//     widthFull: 'w-full',
//     textSmall: 'text-sm',
//     fontMedium: 'font-medium',
//     textGreen: 'text-green-500',
//     marginTopInput: 'mt-1',
//     textPrimary: 'text-primary-foreground',
//     bgPrimary: 'bg-primary',
//     hoverPrimary: 'hover:bg-primary/80',
// }
// const AddDoctor = () => {
//     return (
//         <div className={`${sharedClasses.fullWidth} ${sharedClasses.twoThird} ${sharedClasses.paddingSmall}`}>
//             <form className="space-y-4">
//                 <div>
//                     <label htmlFor="doctor-name" className={`${sharedClasses.block} ${sharedClasses.textSmall} ${sharedClasses.fontMedium}`}>
//                         Doctor Name:
//                     </label>
//                     <input
//                         type="text"
//                         id="doctor-name"
//                         className={`${sharedClasses.marginTopInput} ${sharedClasses.paddingInput} ${sharedClasses.border} ${sharedClasses.borderGray} ${sharedClasses.rounded} ${sharedClasses.widthFull}`}
//                         placeholder="Manoj Kumar"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password" className={`${sharedClasses.block} ${sharedClasses.textSmall} ${sharedClasses.fontMedium}`}>
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         className={`${sharedClasses.marginTopInput} ${sharedClasses.paddingInput} ${sharedClasses.border} ${sharedClasses.borderGray} ${sharedClasses.rounded} ${sharedClasses.widthFull}`}
//                         placeholder="********"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="confirm-password" className={`${sharedClasses.block} ${sharedClasses.textSmall} ${sharedClasses.fontMedium}`}>
//                         Confirm Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="confirm-password"
//                         className={`${sharedClasses.marginTopInput} ${sharedClasses.paddingInput} ${sharedClasses.border} ${sharedClasses.borderGray} ${sharedClasses.rounded} ${sharedClasses.widthFull}`}
//                         placeholder="********"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email" className={`${sharedClasses.block} ${sharedClasses.textSmall} ${sharedClasses.fontMedium}`}>
//                         Email ID:
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         className={`${sharedClasses.marginTopInput} ${sharedClasses.paddingInput} ${sharedClasses.border} ${sharedClasses.borderGray} ${sharedClasses.rounded} ${sharedClasses.widthFull}`}
//                         placeholder="manoj@gmail.com"
//                     />
//                     <span className={`${sharedClasses.textGreen} ${sharedClasses.textSmall}`}>Matching</span>
//                 </div>
//                 <div>
//                     <label htmlFor="consultancy-fees" className={`${sharedClasses.block} ${sharedClasses.textSmall} ${sharedClasses.fontMedium}`}>
//                         Consultancy Fees:
//                     </label>
//                     <input
//                         type="text"
//                         id="consultancy-fees"
//                         className={`${sharedClasses.marginTopInput} ${sharedClasses.paddingInput} ${sharedClasses.border} ${sharedClasses.borderGray} ${sharedClasses.rounded} ${sharedClasses.widthFull}`}
//                         placeholder="650"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className={`${sharedClasses.marginTop} ${sharedClasses.bgPrimary} ${sharedClasses.textPrimary} ${sharedClasses.paddingInput} ${sharedClasses.rounded} ${sharedClasses.hoverPrimary}`}>
//                     Add Doctor
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default AddDoctor


import React from 'react'
import { FaUserMd, FaLock, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa'

const sharedClasses = {
    flexRow: 'flex flex-col md:flex-row md:items-center md:space-x-4',
    inputWrapper: 'flex-1',
    label: 'block text-sm font-medium text-gray-700 mb-1 md:mb-0 md:w-1/3',
    input: 'w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent',
    icon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
    button: 'w-full md:w-auto mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
}

const InputField = ({ label, id, type, placeholder, icon: Icon }) => (
    <div className={sharedClasses.flexRow}>
        <label htmlFor={id} className={sharedClasses.label}>
            {label}
        </label>
        <div className={`${sharedClasses.inputWrapper} relative`}>
            <Icon className={sharedClasses.icon} />
            <input
                type={type}
                id={id}
                className={`${sharedClasses.input} pl-10`}
                placeholder={placeholder}
            />
        </div>
    </div>
)

const DeleteDoctor = () => {
    return (
        <div className="w-1/2 h-full mt-24 mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Delete Doctor</h2>
            <form className="space-y-6">

                <InputField
                    label="Email ID"
                    id="email"
                    type="email"
                    placeholder="manoj@example.com"
                    icon={FaEnvelope}
                />

                <div className="flex justify-start">
                    <button type="submit" className={sharedClasses.button}>
                        Delete Doctor
                    </button>
                </div>
            </form>
            {/* <p className="text-green-500 mt-4 text-center text-sm">Passwords matching</p> */}
        </div>
    )
}

export default DeleteDoctor