"use client";

import NavBar from "../components/client-side/NavBar";
import { useRouter } from "next/navigation";
import PremiumPanel from "../../account/premiumPanel";
import { useEffect, useState } from "react";
import { initFirebase } from "../firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "../../account/stripePayment";
import { getPremiumStatus } from "../../account/getPremiumStatus";
import Footer from "../components/Footer";


export default function Settings() {

    const app = initFirebase();
        const auth = getAuth(app);
        const email = auth.currentUser?.email;
        const router = useRouter();
        const [isPremium, setIsPremium] = useState(false);
    
        useEffect(() => {
            const checkPremium = async () => {
                const newPremiumStatus = auth.currentUser 
                    ? await getPremiumStatus(app) 
                    : false;
                setIsPremium(newPremiumStatus);
            };
            checkPremium();
        }, [app, auth.currentUser?.uid]);
    
        // const manageSubscription = async () => {
        //     const portalUrl = await getPortalUrl(app);
        //     router.push(portalUrl);
        //     console.log("Manage Subscription");
        // };

        const statusPanel = isPremium ? <PremiumPanel /> : "Not subscribed - visit subscription page to access premium material."; 

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar />
           <div className="flex-row md:absolute md:right-0 md:w-3/4">
                <div className="flex flex-col w-full md:mt-20">
                    <div className="text-blue-950 p-8">
                        <h1 className="text-xl font-bold py-4">Settings</h1>
                        <hr className="border-t border-gray-300" />
                        <h2 className="text-lg font-bold py-4">Your Subscription Plan</h2>
                        <div className="mb-4">{statusPanel}</div>
                        <hr className="border-t border-gray-300" />
                        <h2 className="text-lg font-bold py-4">Email</h2>
                        <div>{email}</div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}