"use client"

import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaRegCirclePlay } from "react-icons/fa6";

export default function AudioPlayer({ book }) {
    return (
        <div className="flex flex-col sticky bottom-0 bg-blue-950 items-center justify-center text-white ">
            <div className="flex items-center p-4 gap-4">
                <img className="max-h-15" src={book.imageLink}/>
                <div className="text-sm">
                    <p className="font-semibold">{book.title}</p>
                    <p>{book.author}</p>
                </div>
            </div>
            <div className="flex gap-10 py-3 text-3xl">
                <button>
                    <TbRewindBackward10 />
                </button>
                <button>
                    <FaRegCirclePlay />
                </button>
                <button>
                    <TbRewindForward10 />
                </button>
            </div>
            <div>
                
            </div>

        </div>
    )
}