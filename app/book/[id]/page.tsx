interface PageProps {
    params: Promise<{ id: string }>;
}

import NavBar from '../../components/client-side/NavBar.jsx';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { SlMicrophone } from "react-icons/sl";
import { RiLightbulbLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";


export default async function BookPage({ params }: PageProps) {

    const { id } = await params;
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
    const book = await res.json();

 return (
    <div>
        <NavBar />
        <div className="flex flex-col items-center text-blue-950">
            <img className="p-8 max-h-80" src={book.imageLink} />
            <div className="items-start w-full p-8">
                <h1 className="text-2xl font-extrabold">{book.title}</h1>
                <p className="text-sm font-bold">{book.author}</p>
                <h2 className="font-semilight">{book.subTitle}</h2>
                <hr className="border-t border-gray-300" />
                <div>
                    <span className="flex justify-between">
                        <span className="flex">
                            <FaRegStar />
                            <p>{book.averageRating}</p>
                            <p>({book.totalRating} ratings)</p>
                        </span>
                        <span>
                            <CiClock2 />
                        </span>
                    </span>
                    <span className="flex justify-between">
                        <span className="flex">
                            <SlMicrophone />
                            <p>{book.type}</p>
                        </span>
                        <span className="flex">
                            <RiLightbulbLine />
                            <p>{book.keyIdeas} Key Ideas</p>
                        </span>
                    </span>
                    <hr className="border-t border-gray-300" />
                </div>
                <div className="flex text-white p-4 gap-8">
                    <button className="flex bg-blue-950 p-4 gap-2 rounded-sm w-full max-w-40 items-center justify-center hover:bg-blue-950/75 transition">
                        <FiBookOpen />
                        <p>Read</p>
                    </button>
                    <button className="flex bg-blue-950 p-4 gap-2 rounded-sm w-full max-w-40 items-center justify-center  hover:bg-blue-950/75 transition">
                        <SlMicrophone />
                        <p>Listen</p>
                    </button>
                </div>
                <button className="text-blue-600 font-semibold flex gap-2 items-center">
                    <FaRegBookmark />
                    Add Title to My Library
                </button>
                <div>
                    <h2 className="text-lg font-semibold py-6">What's it about?</h2>
                    <span className="flex gap-6">
                        {book.tags.map((tags, index) => (
                            <p className="bg-green-800/10 max-w-80 text-sm font-semibold p-2 rounded-sm mb-6" key={index}>{tags}</p>
                        ))}
                    </span>
                    <p className="text-sm">{book.bookDescription}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold py-6">About the Author</h2>
                    <p className="text-sm">{book.authorDescription}</p>
                </div>
            </div>
        </div>
    </div>
 )
}