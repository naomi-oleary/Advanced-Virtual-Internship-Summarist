'use client'

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../Images/logo.png';
import { CiHome } from "react-icons/ci";
import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdPayment } from "react-icons/md";

import { useAuth } from "../../../account/AuthContext";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function SideMenu({ }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/for-you');
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>

    return (
        <div className="absolute left-0 top-0 text-blue-950 bg-gray-50 w-2/3 h-screen flex flex-col justify-between">
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
            </div>
            <div className="text-base px-6">
                <nav className="flex flex-col items-start gap-y-4 mb-4">
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
                            <LogoutButton />
                        ) : (
                            <LoginButton />
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}