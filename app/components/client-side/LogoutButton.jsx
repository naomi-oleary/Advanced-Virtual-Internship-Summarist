'use client'

import { initFirebase } from "../../firebase";
import { signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { IoMdLogOut } from "react-icons/io";

export default function LogoutButton() {

    const app = initFirebase();
    const auth = getAuth(app);
    const router = useRouter();

    const logOut = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    return (
        <div className="h-full flex items-center gap-2" onClick={logOut} >
            <IoMdLogOut />
            <p>Log Out</p>
        </div>
    )
}