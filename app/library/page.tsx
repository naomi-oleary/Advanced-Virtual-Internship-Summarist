'use client' 
import { useEffect, useState } from 'react';
import NavBar from "../components/client-side/NavBar";
import Footer from "../components/Footer";
import BookCard from '../components/UI/BookCard';
import { initFirebase, db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import SideMenu from '../components/client-side/SideMenu';

export default function LibraryPage() {

        const [loading, setLoading] = useState<boolean>(true);
        const [libraryBooks, setLibraryBooks] = useState<any[]>([]);
        const app = initFirebase();
        const auth = getAuth(app);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const toggleMenu = () => setIsMenuOpen((prev) => !prev);
        const closeMenu = () => setIsMenuOpen(false);

       useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(
                    collection(db, "users", user.uid, "library"),
                    orderBy("savedAt", "desc")
                );
    
                const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                    const books = snapshot.docs.map(doc => doc.data());
                    setLibraryBooks(books);
                    setLoading(false);
                });
                return () => unsubscribeSnapshot();
            } else {
                setLibraryBooks([]);
                setLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    if (loading) return (<div>Loading...</div>)

    return (
        <div className="flex flex-col min-h-screen w-full">
            <NavBar onToggleMenu={toggleMenu} />
            <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} />
           <div className="flex-row md:right-0 md:ml-62">
                <div className="flex flex-col w-full md:mt-20">
                    <div className="text-blue-950 p-8">
                        <h1 className="text-xl font-bold py-4">My Library</h1>
                        <div className="">
                            {libraryBooks.length === 0 
                                ? (<div>No books have been added to your library. Make your first selection to start building your collection.</div>)
                                : (
                                    <div className="flex flex-col overflow-auto">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {libraryBooks.map((book: any, index: number) => (
                                                <BookCard key={book.id || index} book={book} />
                                            ))}
                                        </div>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}