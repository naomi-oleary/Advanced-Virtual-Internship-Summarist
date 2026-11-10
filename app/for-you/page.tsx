'use client';

import RecommendedBookCard from '../components/UI/RecommendedBookCard';
import SuggestedBooks from '../components/UI/SuggestedBooks';
import NavBar from "../components/client-side/NavBar";
import SelectedBookCard from '../components/UI/SelectedBookCard';
import { useState, useRef } from 'react';
import SideMenu from '../components/client-side/SideMenu';


export default function ForYouPage() {

        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const toggleMenu = () => setIsMenuOpen((prev) => !prev);
        const closeMenu = () => setIsMenuOpen(false);
        const hamburgerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar onToggleMenu={toggleMenu} hamburgerRef={hamburgerRef}/>
           <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} hamburgerRef={hamburgerRef}/>
           <div className="flex-row md:right-0 md:ml-62">
                <div className="flex flex-col w-full mt-20">
                    <section id="SELECTED" className="px-8 py-4 w-full">
                            <h1 className="py-4 font-bold text-2xl text-black">Selected just for you</h1>
                            <div className="flex w-full">
                                <SelectedBookCard />
                            </div>

                    </section>
                    <section id="RECOMMENDED" className="px-8 py-4">
                            <h1 className="py-4 font-bold text-2xl text-black">Recommended For You</h1>
                            <div className="relative w-full mx-auto py-10">
                                <RecommendedBookCard />
                            </div>
                    </section>
                    <section id="SUGGESTED" className="px-8 py-4">
                            <h1 className="py-4 font-bold text-2xl text-black">Suggested Books</h1>
                            <div className="relative w-full mx-auto py-10" >
                                <SuggestedBooks />
                            </div>
                    </section>
                </div>
           </div>
        </div>
    )
}