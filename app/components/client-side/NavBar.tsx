'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from 'react';
import { useAuth } from "../../../account/AuthContext";
import BookSearch from "./BookSearch";

export default function NavBar({ onToggleMenu }: { onToggleMenu: () => void}) {
    
    const { user, loading } = useAuth();
    const hamburgerRef = useRef(null);

    if (loading) return <p>Loading...</p>

    return (
        <div className="flex border-b border-gray-200 h-full md:w-full p-4 justify-end items-center">
            <BookSearch className="z-3" />
            <div 
                className="flex mx-4 place-items-center text-2xl"
                ref={hamburgerRef}
                onClick={onToggleMenu} 
            >
                <GiHamburgerMenu className="md:hidden" />
            </div>
</div>
    )
}