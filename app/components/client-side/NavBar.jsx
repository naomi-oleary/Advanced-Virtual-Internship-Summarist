'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

export default function NavBar() {

    const [query, setQuery] = useState('')

    return (
        <div className="flex border-b border-gray-200 h-full p-4 justify-end items-center">
            <div className="flex bg-gray-100 border border-gray-300 rounded-lg">
                <input
                    type='text'
                    value=''
                    placeholder='Search for books'
                    onChange={(e) => setQuery(e.target.value)}
                    className='flex p-2'>
                </input>
                <button 
                    className="border-l  border-gray-300 p-3"
                    >
                    <FaSearch />
                </button>
            </div>
            <button className="flex mx-4 place-items-center text-2xl">
                <GiHamburgerMenu />
            </button>
        </div>
    )
}