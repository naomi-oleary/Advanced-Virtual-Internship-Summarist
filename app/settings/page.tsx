"use client";

import NavBar from "../components/client-side/NavBar";
import { useRouter } from "next/navigation";
import PremiumPlusPanel from "../../account/premiumPlusPanel";
import PremiumPanel from "../../account/premiumPanel";
import { useEffect, useState } from "react";
import { initFirebase } from "../firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "../../account/stripePayment";
import { getPremiumStatus } from "../../account/getPremiumStatus";


export default function Settings() {

    const app = initFirebase();
        const auth = getAuth(app);
        const userName = auth.currentUser?.displayName;
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
    
        const upgradeToPremium = async () => {
            const priceId = "price";
            const checkoutUrl = await getCheckoutUrl(app, priceId);
            router.push(checkoutUrl);
            console.log("Upgrade to Premium");
        }
    
        const manageSubscription = async () => {
            const portalUrl = await getPortalUrl(app);
            router.push(portalUrl);
            console.log("Manage Subscription");
        };
    
        const upgradeToPremiumButton = (
            <button onClick={upgradeToPremium} className="button">Upgrade to Premium</button>
        )
    
        const managePortalButton = (
            <button onClick={manageSubscription} className="button" >
                ManageSubscription
            </button>
        )

        const statusPanel = isPremium ? <PremiumPlusPanel /> : <PremiumPanel />; 
    
        const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;

    return (
        <div>
            <NavBar />
            <div className="text-blue-950 p-8">
                <h1 className="text-xl font-bold py-4">Settings</h1>
                <hr className="border-t border-gray-300" />
                <h2 className="text-lg font-bold py-4">Your Subscription Plan</h2>
                <p className="mb-4">{statusPanel}</p>
                <hr className="border-t border-gray-300" />
                <h2 className="text-lg font-bold py-4">Email</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}