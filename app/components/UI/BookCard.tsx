import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";

export default async function BookCard ({ book }) {


    return (
        <div 
            key={book.id} 
            className="lg:min-w-1/5 md:min-w-1/4 sm:min-w-1/3 xs:min-w-1/2 mx-2 snap-center p-4 hover:bg-teal-50 hover:rounded-sm transition " 
            // onClick = {handleNa}
        >
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
    )
}