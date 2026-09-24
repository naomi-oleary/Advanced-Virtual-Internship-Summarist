interface PageProps {
    params: Promise<{ id: string }>;
}

import NavBar from '../../components/client-side/NavBar.jsx';
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { SlMicrophone } from "react-icons/sl";
import { RiLightbulbLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";


export default async function BookPage({ params }: PageProps) {

    const { id } = await params;
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
    const book = await res.json();

 return (
    <div>
        <NavBar />
        <div className="flex flex-col items-center text-blue-950">
            <img className="p-8 max-h-80" src={book.imageLink} />
            <div>
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
                <div className="flex text-white p-4">
                    <button className="flex bg-blue-950 p-4 rounded-sm">
                        <FiBookOpen />
                        <p>Read</p>
                    </button>
                    <button className="flex bg-blue-950 p-4 rounded-sm">
                        <SlMicrophone />
                        <p>Listen</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
 )
}