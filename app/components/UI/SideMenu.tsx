'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../Images/logo.png';
import { CiHome } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdPayment } from "react-icons/md";

export default function SideMenu() {

    return (
        <div className="absolute left-0 mt-24 z-2 text-blue-950 bg-white w-2/3">
            <div>
                <figure className="nav__img--mask flex justify-center py-8">
                    <Image className="nav__img" src={Logo} alt="logo" />
                </figure>
                <nav className="flex flex-col items-start px-6 text-base gap-y-4">
                    <Link href="/for-you" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                        <CiHome />
                        <p>For You</p>
                    </Link>
                    <Link href="/subscription-plan" className="flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                        <MdPayment />
                        <p>Subscriptions</p>
                    </Link>
                    <Link href="/" className="cursor-not-allowed flex items-center gap-2 focus:border-l-4 focus:border-green-300">
                        <IoSearch />
                        <p>Search</p>
                    </Link>
                </nav>
            </div>
        </div>
    )
}