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
}

import BookCard from './BookCard';
import { useState, useEffect } from 'react';

async function getSelectedBook(): Promise<Book[]> {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }
        return res.json() as Promise<Book[]>
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
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap">
            {selectedBook && selectedBook.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}