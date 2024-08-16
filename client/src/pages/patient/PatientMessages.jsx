import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/Actions/PatientAction';
import { FaPaperPlane } from 'react-icons/fa';

const SendMessageForm = () => {
    const dispatch = useDispatch();
    const { loading, message: sentMessage, error } = useSelector((state) => state.message);
    const [messageInput, setMessageInput] = useState('');
    const [formErrors, setFormErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) {
            setFormErrors('Message is required.');
            return;
        }
        setFormErrors('');
        dispatch(sendMessage({ message: messageInput }));
        setMessageInput('');
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
        if (e.target.value.trim()) {
            setFormErrors('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-20">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Send a Message</h2>
            {formErrors && <p className="text-red-500 mb-4 font-medium">{formErrors}</p>}
            {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}
            {sentMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Success!</p>
                    <p>Message sent successfully.</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <textarea
                        className={`w-full h-40 px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-200 ${formErrors ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Type your message here..."
                        value={messageInput}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className="absolute bottom-3 right-3 text-gray-400">
                        {messageInput.length}/500
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                    disabled={loading || !messageInput.trim()}
                >
                    <FaPaperPlane className="h-5 w-5" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
            </form>
        </div>
    );
};

export default SendMessageForm;