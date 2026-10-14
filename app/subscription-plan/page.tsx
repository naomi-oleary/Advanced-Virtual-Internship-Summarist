'use client'

import Image from 'next/image';
import Pricing from '../Images/pricing-top.png';
import { FaRegFileLines, FaHandshakeSimple } from "react-icons/fa6";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { PiPlantDuotone } from "react-icons/pi";
import { useState } from 'react';
import FAQDropdown from '../components/client-side/FAQDropdown';
import AuthenticationModal from '../components/client-side/AuthenticationModal';
import NavBar from '../components/client-side/NavBar';


export default function SubscriptionPage({ className= "" }) {

    const [isToggled1, setIsToggled1] = useState(false);
    const [isToggled2, setIsToggled2] = useState(false);

    const toggleSwitch = (toggleNumber) => {
        if (toggleNumber === 1) {
            setIsToggled1(true);
            setIsToggled2(false);
        }
        if (toggleNumber === 2) {
            setIsToggled1(false);
            setIsToggled2(true);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center text-white bg-blue-950">
                <h1 className="text-2xl font-semibold mt-6">Get unlimited access an amazing digital library</h1>
                <p className="py-4">Turn ordinary moments into life-changing learning opportunities</p>
                <Image 
                    src={Pricing} 
                    alt="pricing image"
                    className="max-w-1/2 rounded-t-full"
                />
            </div>
            <div className="flex flex-col items-center gap-y-4 p-10 text-lg text-blue-950">
                <FaRegFileLines className="text-5xl" />
                <p>
                    <span className="font-semibold">Key ideas in little time</span> with many books to read
                </p>
                <PiPlantDuotone className="text-5xl" />
                <p>
                    <span className="font-semibold">3 million people</span> growing with Summarist every day
                </p>
                <FaHandshakeSimple className="text-5xl" />
                <p>
                    <span className="font-semibold">Precise recommendations</span> curated for you by experts
                </p>
            </div>
            <div className="text-blue-950 flex flex-col items-center p-6">
                <h1 className="text-2xl font-bold py-8">Choose the plan that works for you</h1>
                <div 
                    className="flex border-3 focus:border-green-300 border-gray-300 rounded-sm w-full p-4"
                    onClick={() => toggleSwitch(1)}
                >
                    {isToggled1 ? ( <FaRegDotCircle /> ) : ( <FaRegCircle /> )}
                    <div className="px-6">
                        <h3 className="text-xl font-bold">Premium Plus Yearly</h3>
                        <p className="text-2xl font-bold">$99.99/year</p>
                        <p className="text-sm text-gray-400">7-day free trial to start</p>
                    </div>
                </div>
                <div className="p-4 flex items-center">
                    <hr className="border-t border-gray-300 w-10" />
                    <span className="px-2">or</span>
                    <hr className="border-t border-gray-300 w-10" />
                </div>
                <div 
                    className="flex border-3 border-gray-300 rounded-sm w-full p-4"
                    onClick={() => toggleSwitch(2)}
                >
                    {isToggled2 ? ( <FaRegDotCircle /> ) : ( <FaRegCircle /> )}
                    <div className="px-6">
                        <h3 className="text-xl font-bold">Premium Monthly</h3>
                        <p className="text-2xl font-bold">$9.99/month</p>
                        <p className="text-sm text-gray-400">No trial included</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-8 sticky bottom-0 bg-white w-full">
                {isToggled2 ? (
                    <>
                        <button 
                            className="p-3 bg-green-300 rounded-sm font-semibold w-1/2"
                            onClick={() => setIsModalOpen(true)}
                        >
                                Start your first month
                        </button>
                        <AuthenticationModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                        >
                            <div className="flex flex-col relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-0 right-0"
                                    >
                                    ✕
                                </button>
                                <h1 className="font-bold text-xl text-blue-950 my-6">Log in to Summarist</h1>
                            </div>
                        </AuthenticationModal>
                        <div>
            </div>
                        <p className="text-sm text-gray-400 p-2">30-day money back guarantee, no questions asked.</p>
                    </>
                ) : (
                    <>
                        <button 
                            className="p-3 bg-green-300 rounded-sm font-semibold w-1/2"
                            onClick={() => setIsModalOpen(true)}
                        >
                                Start your 7-day free trial
                        </button>
                        <AuthenticationModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                        >
                            <div className="flex flex-col relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-0 right-0"
                                    >
                                    ✕
                                </button>
                                <h1 className="font-bold text-xl text-blue-950 my-6">Log in to Summarist</h1>
                            </div>
                        </AuthenticationModal>
                        <p className="text-sm text-gray-400 p-2">Cancel your trial any time before it ends for no charge.</p>
                    </>
                )}
            </div>
            <FAQDropdown />
        </div>
    )
}