import BookPill from './BookPill';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import Link from 'next/link';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { initFirebase } from "../../firebase";
// import { getAuth } from 'firebase/auth';

export default async function BookCard ({ book }) {

    // const router = useRouter();
    // const app = initFirebase();
    // const auth = getAuth(app);
    // const { user, loading } = useAuth()

    const needPremiumBookPill = (book) => {
        if (book.subscriptionRequired) {
            return <BookPill />;
        }
        return null;
    }

    // const premiumClickHandler = (book) => {
    //     useEffect(() => {
    //         if (!loading && !user) {
    //             router.replace('/subscription-plan');
    //         }
    //     }, [user, loading, router]);
    // }

    return (
        <div 
            key={book.id} 
            className="lg:min-w-1/5 md:min-w-1/4 sm:min-w-1/3 xs:min-w-1/2 mx-2 snap-center p-4 hover:bg-olive-100 hover:rounded-sm transition " 
        >
            <Link href={`/book/${book.id}`}>
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