"use client";

import NavBar from "../components/client-side/NavBar";
import { useRouter } from "next/navigation";
import PremiumPanel from "../../account/premiumPanel";
import { useEffect, useState, useRef } from "react";
import { initFirebase } from "../firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "../../account/stripePayment";
import { getPremiumStatus } from "../../account/getPremiumStatus";
import Footer from "../components/Footer";
import SideMenu from "../components/client-side/SideMenu";


export default function Settings() {

    const app = initFirebase();
    const auth = getAuth(app);
    const email = auth.currentUser?.email;
    const router = useRouter();
    const [isPremium, setIsPremium] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkPremium = async () => {
            const newPremiumStatus = auth.currentUser 
                ? await getPremiumStatus(app) 
                : false;
            setIsPremium(newPremiumStatus);
        };
        checkPremium();
    }, [app, auth.currentUser?.uid]);

    const statusPanel = isPremium ? <PremiumPanel /> : "Not subscribed - visit subscription page to access premium material."; 

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar onToggleMenu={toggleMenu} hamburgerRef={hamburgerRef}/>
           <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} hamburgerRef={hamburgerRef}/>
           <div className="flex-row md:right-0 md:ml-62">
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
                </div>
            </div>
        </div>
    )
}