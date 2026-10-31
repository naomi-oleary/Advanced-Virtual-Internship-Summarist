'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useRef, useEffect } from 'react';
import SideMenu from './SideMenu';
import { useAuth } from "../../../account/AuthContext";
import BookSearch from "./BookSearch";

export default function NavBar() {

    const { user, loading } = useAuth();
    const [ isMenuOpen, setIsMenuOpen ] = useState(true);
    const sideMenuRef = useRef(null);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const handleClickOutside = (event) => {
        if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
            closeMenu();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <div className="flex border-b border-gray-200 h-full md:w-full p-4 justify-end items-center">
            <BookSearch className="z-3" />
            <div 
                className="flex mx-4 place-items-center text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <GiHamburgerMenu onClick={openMenu} className="md:hidden" />
            </div>
            <div ref={sideMenuRef} 
                className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex fixed left-0 z-4 md:w-1/4 md:h-100vh transition duration-200 ease-in-out`}>
                <SideMenu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    className="w-full h-full"
                />
            </div>
</div>
    )
}