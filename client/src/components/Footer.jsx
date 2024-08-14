import React from 'react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { DiMongodb } from "react-icons/di";
import { SiExpress } from "react-icons/si";

const Footer = () => {
    return (
        <div className="bg-blue-900 text-white p-4 flex justify-evenly items-center">
            <div className="flex items-center">
                <span>&copy; 2024 Hospital Management System</span>
            </div>
            <div className="flex items-center">
                <p className='mr-2'>Made with</p>
                <FaReact className="text-blue-500 h-8 w-8 animate-spin" />
                <FaNodeJs className="text-green-500 h-8 w-8 bounce-animation" />
                <SiExpress className="text-yellow-500 h-8 w-8 pulse-animation" />
                <DiMongodb className="text-green-900 h-8 w-8 rotate-180" />
            </div>
        </div>
    );
};

export default Footer;