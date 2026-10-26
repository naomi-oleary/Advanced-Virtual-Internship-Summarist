'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import SideMenu from './SideMenu';

export default function NavBar() {

    const [query, setQuery] = useState('');
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const sideMenuRef = useRef(null);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

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

    return (
        <div className="flex border-b border-gray-200 h-full p-4 justify-end items-center">
            <div className="flex bg-gray-100 border border-gray-300 rounded-lg">
                <input
                    type='text'
                    value={query}
                    placeholder='Search for books'
                    onChange={(e) => setQuery(e.target.value)}
                    className='flex p-2'>
                </input>
                <button className="border-l border-gray-300 p-3">
                    <FaSearch />
                </button>
            </div>
            <div 
                className="flex mx-4 place-items-center text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <GiHamburgerMenu />
                {isMenuOpen && (
                    <div ref={sideMenuRef} className="transition duration-200 ease-in-out">
                        <SideMenu 
                            isOpen={isMenuOpen}
                            onClose={() => setIsMenuOpen(false)}
                            className="fixed left-0"
                        />
                    </div>)
                }
            </div>
        </div>
    )
}