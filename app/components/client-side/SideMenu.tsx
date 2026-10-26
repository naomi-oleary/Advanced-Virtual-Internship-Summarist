'use client'

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../Images/logo.png';
import { CiHome } from "react-icons/ci";
import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaGear} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { initFirebase } from "../../firebase";
import { signOut, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import LoginButton from './LoginButton';

export default function SideMenu({ }) {

    const [user, setUser] = useState<User | null>(null);
    const app = initFirebase();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth])

    const handleSignOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="absolute left-0 top-0 text-blue-950 bg-gray-50 w-2/3 h-screen">
            <div>
                <figure className="nav__img--mask flex justify-center py-8">
                    <Image className="nav__img" src={Logo} alt="logo" />
                </figure>
                    <nav className="flex flex-col items-start px-6 text-base gap-y-4">
                        <Link href="/for-you" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                            <CiHome />
                            <p>For You</p>
                        </Link>
                        <Link href="/subscription-plan" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                            <MdPayment />
                            <p>Subscriptions</p>
                        </Link>
                        <Link href="/" className="cursor-not-allowed flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                            <IoSearch />
                            <p>Search</p>
                        </Link>
                    </nav>
                    <nav className="flex flex-col items-start px-6 text-base gap-y-4 fixed bottom-8">
                        <Link href="/settings" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                            <FaGear />
                            <p>Settings</p>
                        </Link>
                        <Link href="/" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300 cursor-not-allowed">
                            <FaRegQuestionCircle />
                            <p>Support</p>
                        </Link>
                        <div>
                            {user ? (
                                <button type="button" className="flex items-center gap-2" onClick={handleSignOut}>
                                    <IoMdLogOut />
                                    <p>Logout</p>
                                </button>
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </nav>
            </div>
        </div>
    )
}