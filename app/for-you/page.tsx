
import BookCard from '../components/UI/BookCard';
import RecommendedBookCard from '../components/UI/RecommendedBookCard';
import SuggestedBooks from '../components/UI/SuggestedBooks';
import NavBar from "../components/client-side/NavBar";
import { CgPlayButtonO } from "react-icons/cg";

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

async function getSelectedBook(): Promise<Book[]> {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }
        return res.json() as Promise<Book[]>
    }

export default async function ForYouPage() {
    const selectedBook = await getSelectedBook();

    return (
        <div>
           <NavBar />
           <section id="SELECTED" className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Selected just for you</h1>
                {Array.isArray(selectedBook) && selectedBook.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
           </section>
           <section id="RECOMMENDED" className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Recommended For You</h1>
                <div className="relative w-full mx-auto py-10">
                    <RecommendedBookCard />
                </div>
           </section>
           <section id="SUGGESTED" className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Suggested Books</h1>
                <div className="relative w-full mx-auto py-10">
                    <SuggestedBooks />
                </div>
           </section>
        </div>
    )
}