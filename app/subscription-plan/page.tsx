import Image from 'next/image';
import Pricing from '../Images/pricing-top.png';
import { FaRegFileLines, FaHandshakeSimple } from "react-icons/fa6";
import { PiPlantDuotone } from "react-icons/pi";

export default function SubscriptionPage() {
    return (
        <div>
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
            <div className="text-blue-950 flex flex-col items-center">
                <h1 className="text-2xl font-bold">Choose the plan that works for you</h1>
            </div>
        </div>
    )
}