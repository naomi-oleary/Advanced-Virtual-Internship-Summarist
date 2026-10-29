'use client';

import BookPill from './BookPill';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import Link from 'next/link';
import { useAuth } from '../../../account/AuthContext';
import { useEffect, useState } from 'react';
import { initFirebase } from "../../firebase";
import { getPremiumStatus } from "../../../account/getPremiumStatus";

export default function BookCard ({ book }) {
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
            ? "/subscription-plan"
            : `/book/${book.id}`
    ;

    const needPremiumBookPill = (book) => {
        if (book.subscriptionRequired) {
            return <BookPill />;
        }
        return null;
    }

    return (
        <div 
            key={book.id} 
            className="lg:min-w-1/5 md:min-w-1/4 sm:min-w-1/3 xs:min-w-1/2 mx-2 snap-center p-4 hover:bg-olive-100 hover:rounded-sm transition "
        >
            <Link href={href}>
                <div className="flex justify-end mr-2">
                    {needPremiumBookPill(book)}
                </div>
                <img src={book.imageLink} />
                <div className="text-wrap">
                    <h2 className="font-bold">{book.title}</h2>
                    <p className="font-extralight text-sm">{book.author}</p>
                    <p className="text-sm">{book.subTitle}</p>
                    <div className="flex items-center">
                        <CiClock2 />
                        <p></p>
                        <FaRegStar />
                        <p className="text-sm font-light">{book.averageRating}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}