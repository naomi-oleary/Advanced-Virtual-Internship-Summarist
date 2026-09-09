"use client";

import { useState, useEffect, useRef } from 'react';

export default function AuthenticationModal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target ===dialogRef.current) {
            onClose();
        }
    }

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email and pw:', inputValue);
    }
    
    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleBackdropClick}
            className="fixed inset-0 m-auto w-full max-w-md rounded-sm backdrop:bg-black/75 shadow-xl outline-none border-none">
                <div className="relative p-6 bg-white text-center">
                    {children}
                    <div className="flex flex-col">
                            <button className="btn p-4 border rounded h-full w-full bg-blue-700">Login as a Guest</button>
                            <button className="btn p-4 bg-red-500 ">Login with Google</button>
                    </div>
                    <form
                        className="flex flex-col gap-4">
                        
                        <input
                           type="email"
                           value={inputValue}
                           onChange={handleChange}
                           placeholder="Email Address"
                           className="border-2 p-1 border-gray-300 focus:border-green-400 rounded text-gray-500">
                        </input>
                        <input
                           type="email"
                           value={inputValue}
                           onChange={handleChange}
                           placeholder="Password"
                           className="border-2 p-1 border-gray-300 focus:border-green-400 rounded text-gray-500">
                        </input>
                    </form>
                </div>
        </dialog>
    );
}