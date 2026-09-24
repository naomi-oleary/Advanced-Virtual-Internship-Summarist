import BookCard from './BookCard';
import { CiClock2 } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';

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

async function getSuggestedBooks(): Promise<Book[]> {
        const res = await  fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }

        return res.json() as Promise<Book[]>
    }

getSuggestedBooks();

export default async function SuggestedBooks() {
    const suggestedBooks = await getSuggestedBooks();

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap">
            {Array.isArray(suggestedBooks) && suggestedBooks.map((book) => (
                <div key={book.id} className="lg:min-w-1/5 md:min-w-1/4 sm:min-w-1/3 xs:min-w-1/2 mx-2 snap-center" >
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
                </div>
            ))}  
        </div>
    )
}