"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GoogleLogo from '../../Images/google.png';
import { initFirebase } from "../../firebase.ts";
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged 
} from "firebase/auth";

export default function AuthenticationModal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    const router = useRouter();

    const app = initFirebase();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);

        if (user) {
            goToForYou();
        }
    }

    const goToForYou = () => {
        router.push('/for-you');
    }

    const createAccount = async () => {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch ((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
        if (user) {
            goToForYou();
        }
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                goToForYou();
            }
        });
        return () => unsubscribe();
    }, [auth, router]);

    const handleBackdropClick = (e) => {
        if (e.target ===dialogRef.current) {
            onClose();
        }
    }

    async function emailSignIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            window.location.href = '/for-you';
        } catch (error) {
            console.error("Login failed: incorrect email or password")
        }
    }

    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');

    const handleEmailChange = (e) => {
        setEmailInputValue(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordInputValue(e.target.value);
    }
    
    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleBackdropClick}
            className="fixed inset-0 m-auto w-full max-w-md rounded-sm backdrop:bg-black/75 shadow-xl outline-none border-none">
                <div className="relative bg-white text-center gap-4 p-10">
                    {children}
                    <div className="flex flex-col py-2 gap-2">
                        <div className="bg-blue-900/90 border rounded text-white">
                            <button className="p-2 h-10 w-full">Login as a Guest</button>
                        </div>
                        <span>or</span>
                        <div className="bg-blue-400 border rounded text-white">
                            <button 
                                className="p-1 flex h-10 w-full items-center" 
                                onClick={googleSignIn}
                            >
                                <Image 
                                    src={GoogleLogo} 
                                    alt="Google Logo"
                                    className="bg-white rounded items-start h-full w-auto object-contain" 
                                />
                                <span className="mx-auto">
                                    Login with Google
                                </span>
                            </button>
                        </div>
                        <span>or</span>
                    </div>
                    <form
                        className="flex flex-col items-center gap-4">
                        
                        <input
                           type="email"
                           value={emailInputValue}
                           onChange={handleEmailChange}
                           placeholder="Email Address"
                           className="border-2 p-1 border-gray-300 focus:border-green-400 rounded w-full text-gray-500">
                        </input>
                        <input
                           type="password"
                           value={passwordInputValue}
                           onChange={handlePasswordChange}
                           placeholder="Password"
                           className="border-2 p-1 border-gray-300 focus:border-green-400 rounded w-full text-gray-500">
                        </input>
                        <button onClick={createAccount(emailInputValue, passwordInputValue)} className="bg-[#2bd97c] hover:bg-[#20ba68] rounded p-2 h-full w-full">Login</button>
                    </form>
                </div>
        </dialog>
    );
}