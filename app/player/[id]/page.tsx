'use client';

interface PageProps {
    params: Promise<{ id: string }>;
}

import AudioPlayer from "@/app/components/client-side/AudioPlayer";
import NavBar from "../../components/client-side/NavBar";
import { useState, useEffect, useRef } from 'react';
import SideMenu from "@/app/components/client-side/SideMenu";

export default function PlayerPage({ params }: PageProps ) {
    const [book, setBook] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadData() {
            const resolvedParams = await params;
            const id = resolvedParams.id;
            const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
            const data = await res.json();
            setBook(data);
        }
        loadData();
    }, [params]);

    if (!book) {
        return <div className="flex min-h-screen items-center justify-center" >Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar onToggleMenu={toggleMenu} hamburgerRef={hamburgerRef}/>
           <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} hamburgerRef={hamburgerRef}/>
           <div className="flex-row md:right-0 md:ml-62">
                <div className="flex flex-col w-full mt-20">
                    <div className="px-4">
                        <h1 className="font-bold text-xl py-6">{book.title}</h1>
                        <hr className="border-t border-gray-300" />
                        <p className="py-6 whitespace-pre-line text-sm">{book.summary}</p>
                    </div>
                    <div className="sticky bottom-0 h-1/5">
                        <AudioPlayer book={book} />
                    </div>
                </div>
            </div>
        </div>
    )
}