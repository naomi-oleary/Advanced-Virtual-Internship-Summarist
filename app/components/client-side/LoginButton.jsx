"use client"

import React from 'react';
import { useState } from 'react';
import { auth } from '../../firebase/init.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

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

    return (
        <div>
            <button onClick={login} className="btn home__cta--btn">Login</button>
        </div>
    )
}