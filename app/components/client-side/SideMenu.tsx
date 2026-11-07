'use client'

interface SideMenuProps {
    isMenuOpen: boolean;
    onCloseMenu: () => void;
}

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../Images/logo.png';
import { CiHome } from "react-icons/ci";
import { FaRegQuestionCircle, FaRegBookmark } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdPayment } from "react-icons/md";

import { useAuth } from "../../../account/AuthContext";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function SideMenu({ isMenuOpen, onCloseMenu }: SideMenuProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const menuElement = sideMenuRef.current;

    const handleClickOutside = (event: MouseEvent ) => {
        if (
            menuElement &&
            event.target instanceof Node &&
            !menuElement.contains(event.target)
        ) {
            onCloseMenu();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/for-you');
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>

    return (
        <div ref={sideMenuRef} 
            className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex fixed left-0 z-4 h-100vh transition duration-200 ease-in-out`}>
            <div 
                className="text-blue-950 bg-gray-50 h-full flex flex-col z-3"
            >
                <div className="fixed top-0 left-0 h-screen bg-gray-50 w-3/4 sm:w-62">
                    <figure className="nav__img--mask flex justify-center py-8">
                        <Image className="nav__img p-3" src={Logo} alt="logo" />
                    </figure>
                    <nav className="flex flex-col items-start px-6 text-sm sm:text-base gap-y-4">
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
                        <Link href="/library" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                            <FaRegBookmark />
                            <p>Library</p>
                        </Link>
                    </nav>
                </div>
                <div className="text-base px-6 fixed bottom-0">
                    <nav className="flex flex-col items-start text-sm sm:text-base gap-y-4 mb-4">
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
        </div>
    )
}