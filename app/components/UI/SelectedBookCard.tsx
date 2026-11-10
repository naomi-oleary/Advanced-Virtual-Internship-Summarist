interface Book {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
    className?: string;
    duration?: number;
}
import { useState, useEffect } from 'react';
import { CgPlayButtonO } from "react-icons/cg";
import Link from 'next/link';

function getAudioDuration(url: string): Promise<number> {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.crossOrigin = "anonymous";
        audio.preload = "metadata";

        const handleLoaded = () => {
            cleanup();
            if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
                resolve(audio.duration);
            } else {
                resolve(0);
            }
        };
        const handleError = () => {
            cleanup();
            resolve(0);
        };
        const cleanup = () => {
            audio.removeEventListener('loadedmetadata', handleLoaded);
            audio.removeEventListener('error', handleError);
        };
        audio.addEventListener('loadedmetadata', handleLoaded);
        audio.addEventListener('error', handleError);
        
        audio.src = url
    });
}

function formatTime(seconds: number | undefined): string {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    return `${formattedMins}:${formattedSecs}`;
}

async function getSelectedBook(): Promise<Book[]> {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }
        const data = await res.json() as Book[];
        const booksWithDuration = await Promise.all(
            data.map(async (book: Book) => {
                if (book.audioLink) {
                    const duration = await getAudioDuration(book.audioLink);
                    return { ...book, duration };
                }
                return { ...book, duration: 0};
            })
        );
        return booksWithDuration;
    }

export default function SelectedBookCard() {
    const [selectedBook, setSelectedBook] = useState<Book[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getSelectedBook()
            .then((data) => setSelectedBook(data))
            .catch((err) => setError(err.message));
    }, [])

    if (error) return <div>Error loading books.</div>

    return (
        <div className="flex bg-amber-400/25 p-8">
            <nav>
                <Link href="/book/f9gy1gpai8">
                    {selectedBook && selectedBook.map((book) => (
                        <div key={book.id} className="flex flex-col md:flex-row md:w-full md:gap-8">
                            <div className="mb-10 md:max-w-32">{book.subTitle}</div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <img src={book.imageLink} className="object-contain h-40" />
                                <div className="gap-y-4">
                                    <h1 className="font-bold">{book.title}</h1>
                                    <p>{book.author}</p>
                                    <div className="flex items-center gap-4">
                                        <CgPlayButtonO className="font-bold text-2xl" />
                                        <p>3 min 23 sec</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Link>
            </nav>
        </div>
    )
}