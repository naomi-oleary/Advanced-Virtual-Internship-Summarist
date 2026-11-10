'use client'

interface PageProps {
    params: Promise<{ id: string }>;
}

import NavBar from '../../components/client-side/NavBar';
import { useState, useEffect, useRef } from 'react';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { SlMicrophone } from "react-icons/sl";
import { RiLightbulbLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import AddToLibraryButton from '../../components/UI/AddToLibraryButton.jsx';
import Link from 'next/link';
import Footer from '@/app/components/Footer.jsx';
import { initFirebase, db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import SideMenu from '@/app/components/client-side/SideMenu';


export default function BookPage({ params }: PageProps) {

    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const app = initFirebase();
    const auth = getAuth(app);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        async function getBook() {
            try {
                setLoading(true);
                const { id } = await params;
                const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
                const book = await res.json();
                setBook(book);
            } catch (error) {
                console.error("failed to fetch book data:", error);
            } finally {
                setLoading(false);
            }
        }
        getBook();
    }, [params])

    const handleLibraryClick = async (selectedBook: any) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert("Please log in to save books to your library.");
            return;
        }
        if (!selectedBook) return;
        const bookId = selectedBook.id
        try {
            const bookRef = doc(db, "users", currentUser.uid, "library", bookId);
            const docSnap = await getDoc(bookRef);
            if (docSnap.exists()) {
                await deleteDoc(bookRef);
                console.log("Book successfully removed from account library database.");
            } else {
                await setDoc(bookRef, {
                    id: bookId,
                    title: selectedBook.title,
                    author: selectedBook.author,
                    imageLink: selectedBook.imageLink,
                    subTitle: selectedBook.subTitle || "",
                    savedAt: new Date().toISOString()
                });
                console.log("Book successfully saved to account library cloud database.")
            }
        } catch (error) {
            console.error("Error updating library in Firestore:", error)
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center w-60 h-60 animate-pulse" />
        )
    }

 return (
        <div className="flex flex-col min-h-screen w-full">
            <NavBar onToggleMenu={toggleMenu} hamburgerRef={hamburgerRef} />
            <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} hamburgerRef={hamburgerRef} />
           <div className="flex-row md:right-0 md:ml-62">
                <div className="flex flex-col w-full">
                    <div className="flex-1 items-center text-blue-950">
                        <img className="p-8 max-h-80 flex m-auto mt-20" src={book.imageLink} />
                        <div className="items-start w-full p-8">
                            <h1 className="text-2xl font-extrabold">{book.title}</h1>
                            <p className="text-sm font-bold py-4">{book.author}</p>
                            <h2 className="font-semilight mb-4">{book.subTitle}</h2>
                            <hr className="border-t border-gray-300" />
                            <div className="font-bold grid grid-cols-2">
                                    <span className="flex gap-2 items-center py-2">
                                        <FaRegStar />
                                        <p>{book.averageRating}</p>
                                        <p>({book.totalRating} ratings)</p>
                                    </span>
                                    <span className="flex gap-2 items-center py-2">
                                        <CiClock2 />
                                    </span>
                                    <span className="flex gap-2 items-center py-2">
                                        <SlMicrophone />
                                        <p>{book.type}</p>
                                    </span>
                                    <span className="flex gap-2 items-center py-2">
                                        <RiLightbulbLine />
                                        <p>{book.keyIdeas} Key Ideas</p>
                                    </span>
                            </div>
                            <hr className="border-t border-gray-300" />
                            <div className="text-white py-4">
                                <Link href={`/player/${book.id}`}  className="flex gap-8">
                                    <button className="flex bg-blue-950 p-4 gap-2 rounded-sm w-full max-w-40 items-center justify-center hover:bg-blue-950/75 transition">
                                        <FiBookOpen />
                                        <p>Read</p>
                                    </button>
                                    <button className="flex bg-blue-950 p-4 gap-2 rounded-sm w-full max-w-40 items-center justify-center  hover:bg-blue-950/75 transition">
                                        <SlMicrophone />
                                        <p>Listen</p>
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <AddToLibraryButton onAdd={() => handleLibraryClick(book)} />
                                <h2 className="text-lg font-semibold py-6">What's it about?</h2>
                                <span className="flex gap-6">
                                    {book.tags.map((tags: string, index: number) => (
                                        <p className="bg-green-800/10 max-w-80 text-sm font-semibold p-4 rounded-sm mb-6" key={index}>{tags}</p>
                                    ))}
                                </span>
                                <p className="text-sm">{book.bookDescription}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold py-6">About the Author</h2>
                                <p className="text-sm">{book.authorDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 )
}