"use client"

import { useState } from 'react';
import AuthenticationModal from "./AuthenticationModal.jsx"

export default function LoginButton({ className = "" }) {


    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className={className}
            >
                Login
            </button>
            <AuthenticationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}