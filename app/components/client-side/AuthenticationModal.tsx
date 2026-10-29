"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../account/AuthContext';
import Image from 'next/image';
import GoogleLogo from '../../Images/google.png';
import { initFirebase } from "../../firebase";
import Link from 'next/link';
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
} from "firebase/auth";

interface AuthenticationModalProps {
    isOpen: Boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function AuthenticationModal({ isOpen, onClose, children }: AuthenticationModalProps) {

    const { user, loading } = useAuth()

    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const router = useRouter();
    const app = initFirebase();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const goToDestination = (path: string = '/for-you') => {
        router.push(path);
    }

    const googleSignIn = async (e: React.MouseEvent, redirectTo?: string) => {
        try {
            const result = await signInWithPopup(auth, provider);
            
            if (user) {
                goToDestination(redirectTo);
            }
        } catch (error) {
            console.error("Google sign-in error", error)
        }
    }

    const createAccount = async (e: React.FormEvent, redirectTo?: string) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            if (user) {
                goToDestination(redirectTo);
            }
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        }
    }

    const emailSignIn = async (e: React.FormEvent, redirectTo?: string) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                goToDestination(redirectTo);
            }
        } catch (error) {
            console.error("Login failed: incorrect email or password")
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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

    if (loading) return <p>Loading...</p>

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target ===dialogRef.current) {
            onClose();
        }
    }
    
    return (
        <div>
            <dialog
                ref={dialogRef}
                onClose={onClose}
                onClick={handleBackdropClick}
                className="fixed inset-0 m-auto w-full max-w-md rounded-sm backdrop:bg-black/75 shadow-xl outline-none border-none">
                <div className="flex flex-col relative p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 p-2"
                        >
                        ✕
                    </button>
                    <h1 className="font-bold text-xl text-blue-950 mt-6">Log in to Summarist</h1>
                </div>
                    <div className="relative bg-white text-center gap-4 p-10">
                        {children}
                        <div className="flex flex-col py-2 gap-2">
                            <div className="bg-blue-900/90 border rounded text-white">
                                <nav>
                                    <Link href={`/for-you`}>
                                        <button className="p-2 h-10 w-full">
                                            Log In as a Guest
                                        </button>
                                     </Link>
                                </nav>
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
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email Address"
                            className="border-2 p-1 border-gray-300 focus:border-green-400 rounded w-full text-gray-500">
                            </input>
                            <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="border-2 p-1 border-gray-300 focus:border-green-400 rounded w-full text-gray-500">
                            </input>
                            <button onClick={createAccount} className="bg-[#2bd97c] hover:bg-[#20ba68] rounded p-2 h-full w-full">Sign Up</button>
                            <button onClick={emailSignIn} className="bg-[#2bd97c] hover:bg-[#20ba68] rounded p-2 h-full w-full">Login</button>
                        </form>
                    </div>
                    {children}
            </dialog>
        </div>
    );
}