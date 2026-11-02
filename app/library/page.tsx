'use client' 
import { useEffect, useState } from 'react';
import NavBar from "../components/client-side/NavBar";
import Footer from "../components/Footer";
import BookCard from '../components/UI/BookCard';
import { initFirebase, db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function LibraryPage() {

        const [loading, setLoading] = useState<boolean>(true);
        const [libraryBooks, setLibraryBooks] = useState<any[]>([]);
        const app = initFirebase();
        const auth = getAuth(app);

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
           <NavBar />
           <div className="flex-row md:absolute md:right-0 md:w-3/4">
                <div className="flex flex-col w-full md:mt-20">
                    <div className="text-blue-950 p-8">
                        <h1 className="text-xl font-bold py-4">My Library</h1>
                        <div>
                            {libraryBooks.length === 0 
                                ? (<div>No books have been added to your library. Make your first selection to start building your collection.</div>)
                                : (
                                    <div className="flex flex-1 flex-grid grid-cols-5 max-h-50">
                                        <div className="object-fit">
                                            {libraryBooks.map((book: any, index: number) => (
                                                <BookCard key={book.id || index} book={book} />
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}