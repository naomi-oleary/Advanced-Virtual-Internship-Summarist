'use client'

import { useState } from 'react';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";


export default function FAQDropdown() {

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const toggleDropdown = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    }

    const faqs = [
        { question: "How does the free 7-day trial work?", answer: "Begin your Summarist annual membership with a 7-day free trial. After or during this trial, you are under no obligation to continue the subscription and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire. You may terminate your subscription prior to the end of your 7-day free trial at no cost." },
        { question: "Can I switch subscriptions once my current plan is activated?", answer: "Once a yearly plan is begun and the trial period is over, it is not possible to switch to a monthly plan until your current subscription has ended. However, is using the monthly plan, at the end of each period you may begin an annual subscription." },
        { question: "What's included in the Premium Plan?", answer: "Premium membership includes the ultimate Summarist experience. You gain unrestricted access to the entire Summarist library or best-selling books and audio recordings. You can download titles for offline reading and listening, and you can send your favorite reads to your Kindle."},
        { question: "Can I cancel my trial or subscription?", answer: "If using the 7-day free trial, you can cancel your subscription at any time during the trial period for no charge. Without a subscription, you may access one curated book per day using the Summarist library."}
    ];

    return (
        <div className="flex flex-col items-center">
            {faqs.map((faq, index) => (
                <div key={index} className="flex-col w-full px-8">
                    <hr className="border-t border-gray-300 w-full" />
                    <button onClick={() => toggleDropdown(index)} className="flex justify-between w-full py-4">
                        <p className="text-lg font-semibold">{faq.question}</p>
                        <FaRegArrowAltCircleDown className={`transform transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === index && (
                        <div>
                            <p className="mb-4">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}