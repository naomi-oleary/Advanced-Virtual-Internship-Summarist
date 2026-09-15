'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

export default function NavBar() {



    return (
        <div className="flex border-b border-gray-200 h-full p-4 justify-end items-center">
            <div className="flex bg-gray-300 border-2 border-gray-400 rounded">
                <input
                    type='text'
                    value=''
                    placeholder='Search for books'
                    onChange=''
                    className='flex p-2'>
                </input>
                <button 
                    className="border-l-2  border-gray-400 p-2"
                    >
                    <FaSearch />
                </button>
            </div>
            <button className="flex p-2 place-items-center text-2xl">
                <GiHamburgerMenu />
            </button>
        </div>
    )
}