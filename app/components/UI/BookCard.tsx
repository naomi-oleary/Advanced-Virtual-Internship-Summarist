'use client';

interface Book {
    id: string;
    title: string;
    subscriptionRequired: boolean;
    imageLink: string;
    author: string;
    subTitle: string;
    averageRating: number;
}

interface BookCardProps {
    book: Book;
}

import BookPill from './BookPill';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import Link from 'next/link';
import { useAuth } from '../../../account/AuthContext';
import { useEffect, useState } from 'react';
import { initFirebase } from "../../firebase";
import { getPremiumStatus } from "../../../account/getPremiumStatus";

export default function BookCard ({ book }: BookCardProps) {
    const { user, loading } = useAuth();
    const [isReady, setIsReady] = useState(false);
    const app = initFirebase();
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        const checkPremium = async () => {
            if (loading) return;
            if (!user) {
                setIsPremium(false);
                return;
            }
            try {
                const newPremiumStatus = await getPremiumStatus(app);
                setIsPremium(newPremiumStatus); 
            } catch (error) {
                console.error ("failed to fetch premium status:", error);
                setIsPremium(false);;
            }
        };
        checkPremium();
    }, [user, loading, app]);

    const href = !isReady
        ? "#"
        : book.subscriptionRequired && (!user || user && !isPremium)
            ? "/settings"
            : `/book/${book.id}`
    ;

    const needPremiumBookPill = (book: Book) => {
        if (book.subscriptionRequired) {
            return <BookPill />;
        }
        return null;
    }

    const userCheckOnBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!loading && !user) {
            e.preventDefault();
            alert('Please log in or create an account to access this book page.')
        }
    }

    return (
        <div 
            key={book.id} 
            className="xl:min-w-1/5 lg:min-w-1/4 md:min-w-1/3 sm:min-w-1/2 min-w-full mx-2 snap-center sm:p-4 hover:bg-olive-100 hover:rounded-sm transition "
        >
            <Link href={href} onClick={userCheckOnBookClick}>
                <div className="flex justify-end mr-2">
                    {needPremiumBookPill(book)}
                </div>
                <img src={book.imageLink} />
                <div className="text-wrap">
                    <h2 className="font-bold">{book.title}</h2>
                    <p className="font-light text-sm">{book.author}</p>
                    <p className="text-sm">{book.subTitle}</p>
                    <div className="flex items-center gap-2">
                        {/* <CiClock2 /> */}
                        <p></p>
                        <FaRegStar />
                        <p className="text-sm font-light">{book.averageRating}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}