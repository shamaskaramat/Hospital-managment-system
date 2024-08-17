import React from 'react';
import { FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { DiMongodb } from "react-icons/di";
import { SiExpress } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-blue-100 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-sm">&copy; 2024 Hospital Management System. All rights reserved.</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm mr-2">Mede with:</p>
                        <FaReact className="text-blue-400 h-6 w-6 hover:text-blue-300 transition-colors duration-300" title="React" />
                        <FaNodeJs className="text-green-400 h-6 w-6 hover:text-green-300 transition-colors duration-300" title="Node.js" />
                        <SiExpress className="text-white h-6 w-6 hover:text-gray-300 transition-colors duration-300" title="Express.js" />
                        <DiMongodb className="text-green-500 h-6 w-6 hover:text-green-400 transition-colors duration-300" title="MongoDB" />
                    </div>
                    <div className="mt-4 md:mt-0">
                        <a href="https://github.com/shamaskaramat" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition-colors duration-300">
                            <FaGithub className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;