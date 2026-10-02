'use client'

import { useState, useEffect, useRef } from 'react';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";


export default function FAQDropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex-col w-full px-8" ref={dropdownRef}>
                    <hr className="border-t border-gray-300 w-full" />
                    <div className="flex justify-between w-full py-4">
                        <p className="text-lg font-semibold">How does the free 7-day trial work?</p>
                        <button onClick={toggleDropdown}>
                            {isOpen ? (
                                <FaRegArrowAltCircleUp />
                            ) : (
                                <FaRegArrowAltCircleDown />
                            )}
                        </button>
                    </div>
                    {isOpen && (
                        <p className="text-sm mb-4">Begin your Summarist annual membership with a 7-day free trial. After or during this trial, you are under no obligation to continue the subscription and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire. You may terminate your subscription prior to the end of your 7-day free trial at no cost.</p>
                    )}
                </div>
                <div className="flex-col w-full px-8" ref={dropdownRef}>
                    <hr className="border-t border-gray-300 w-full" />
                    <div className="flex justify-between w-full py-4">
                        <p className="text-lg font-semibold">Can I switch subscriptions once my current plan is activated?</p>
                        <button onClick={toggleDropdown}>
                            {isOpen ? (
                                <FaRegArrowAltCircleUp />
                            ) : (
                                <FaRegArrowAltCircleDown />
                            )}
                        </button>
                    </div>
                    {isOpen && (
                        <p className="text-sm mb-4">Once a yearly plan is begun and the trial period is over, it is not possible to switch to a monthly plan until your current subscription has ended. However, is using the monthly plan, at the end of each period you may begin an annual subscription.</p>
                    )}
                </div>
                <div className="flex-col w-full px-8" ref={dropdownRef}>
                    <hr className="border-t border-gray-300 w-full" />
                    <div className="flex justify-between w-full py-4">
                        <p className="text-lg font-semibold">What's included in the Premium Plan?</p>
                        <button onClick={toggleDropdown}>
                            {isOpen ? (
                                <FaRegArrowAltCircleUp />
                            ) : (
                                <FaRegArrowAltCircleDown />
                            )}
                        </button>
                    </div>
                    {isOpen && (
                        <p className="text-sm mb-4">Premium membership includes the ultimate Summarist experience. You gain unrestricted access to the entire Summarist library or best-selling books and audio recordings. You can download titles for offline reading and listening, and you can send your favorite reads to your Kindle.</p>
                    )}
                </div>
                <div className="flex-col w-full px-8" ref={dropdownRef}>
                    <hr className="border-t border-gray-300 w-full" />
                    <div className="flex justify-between w-full py-4">
                        <p className="text-lg font-semibold">Can I cancel my trial or subscription?</p>
                        <button onClick={toggleDropdown}>
                            {isOpen ? (
                                <FaRegArrowAltCircleUp />
                            ) : (
                                <FaRegArrowAltCircleDown />
                            )}
                        </button>
                    </div>
                    {isOpen && (
                        <p className="text-sm mb-4">If using the 7-day free trial, you can cancel your subscription at any time during the trial period for no charge. Without a subscription, you may access one curated book per day using the Summarist library.</p>
                    )}
                </div>
            </div>
        </div>
    )
}