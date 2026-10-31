'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from "react-icons/fa";

export default function BookSearch() {
    const [searchId, setSearchId] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = searchId.trim();
        if (!query) return;
        setLoading(true);
        try {
            const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchId}`)
            if (!response.ok) {
                throw new Error('book search failed');
            }
            const responseText = await response.text();
            if (!responseText) {
                alert("Empty response returned")
                return;
            }
            const data = JSON.parse(responseText);
            const id = data?.[0]?.id;
            if(id) {
                router.push(`/book/${id}`);
                setSearchId('');
            } else {
                alert("No book found matching that search term.")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="flex bg-gray-100 border border-gray-300 rounded-lg">
                <input
                    type='text'
                    value={searchId}
                    placeholder='Search for books'
                    onChange={(e) => setSearchId(e.target.value)}
                    className='flex-1 flex p-2 w-full bg-transparent outline-none'>
                </input>
                <button type="submit" className="border-l border-gray-300 p-3">
                    <FaSearch />
                </button>
            </div>
        </form>
    )

}