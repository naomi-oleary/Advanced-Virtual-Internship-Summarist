"use client"

import { useState } from 'react';
import { auth } from '../../firebase/init.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    } from "firebase/auth";
import AuthenticationModal from "./AuthenticationModal.jsx/"

export default function LoginButton({ className = "" }) {

    function login() {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function register() {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const [isModalOpen, setIsModalOpen] =useState(false);

    return (
        <div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className={className}
            >
                Login
            </button>
            <div>
                <AuthenticationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                >
                    <div className="flex flex-col relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-0 right-0"
                            >
                            ✕
                        </button>
                        <h1 className="font-bold text-xl text-blue-950 my-6">Log in to Summarist</h1>
                    </div>

                </AuthenticationModal>
            </div>
        </div>
    )
}