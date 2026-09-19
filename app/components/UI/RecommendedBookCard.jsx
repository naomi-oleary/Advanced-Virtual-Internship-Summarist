import BookCard from '../UI/BookCard';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";

export default async function RecommendedBooks() {
    const { recommendedBooks } = await BookCard();

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap">
            {Array.isArray(recommendedBooks) && recommendedBooks.map((book) => (
                <div key={book.id} className="min-w-1/5 mx-2 snap-center" >
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