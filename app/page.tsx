import React from 'react';
import { RiLeafLine } from 'react-icons/ri';
import { BiCrown } from 'react-icons/bi';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { AiFillFileText, AiFillBulb, AiFillAudio } from 'react-icons/ai';
import HomePage from './components/HomePage';



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main>
        <HomePage />
      </main>
    </div>
  );
}
