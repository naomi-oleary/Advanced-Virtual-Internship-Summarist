"use client"

import { useState } from 'react';
import { auth } from '../../firebase/init.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    } from "firebase/auth";
import AuthenticationModal from "./AuthenticationModal.jsx/"

export default function LoginButton() {

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
            >
                Login
            </button>
            <div>
                <AuthenticationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                >
                    <p>Modal!</p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                    >
                        close button
                    </button>
                </AuthenticationModal>
            </div>
        </div>
    )
}