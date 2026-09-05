"use client"

import React from 'react';
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
            <AuthenticationModal 
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
            >
                <p>Modal!</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    close button
                </button>
            </AuthenticationModal>
        </div>
    )
}