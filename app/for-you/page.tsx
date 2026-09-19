
import BookCard from '../components/UI/BookCard';
import RecommendedBookCard from '../components/UI/RecommendedBookCard';
import NavBar from "../components/client-side/NavBar";
import { CgPlayButtonO } from "react-icons/cg";

// interface ForYouPageProps {
//     selectedBook: any;
//     recommendedBooks: any[];
//     suggestedBooks: any[];
// }

export default async function ForYouPage() {
    const { selectedBook, suggestedBooks } = await BookCard();

    return (
        <div>
           <NavBar />
           <section id="SELECTED" className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Selected just for you</h1>
                {Array.isArray(selectedBook) && selectedBook.map((book) => (
                    <div key={book.id} className="flex flex-col bg-amber-500/15 p-8 rounded-sm">
                        <p className="text-sm">{book.subTitle}</p>
                        <div className="flex mt-6">
                            <img src={book.imageLink} className="h-35 max-w-35" />
                            <div className="flex flex-col gap-2">
                                <h3 className="font-bold text-md">The Lean Startup</h3>
                                <p className="text-sm">{book.author}</p>
                                <div className="flex items-center">
                                    <CgPlayButtonO className="flex items-start text-4xl mr-4" />
                                    <span className="font-bold text-sm">3 mins 23 sec</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
           </section>
           <section id="RECOMMENDED" className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Recommended For You</h1>
                <div className="relative w-full mx-auto">
                    <RecommendedBookCard />
                </div>
           </section>
        </div>
    )
}