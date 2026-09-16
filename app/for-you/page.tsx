
import BookCard from '../components/UI/BookCard';
import NavBar from "../components/client-side/NavBar";
import { CgPlayButtonO } from "react-icons/cg";

export default function ForYouPage() {
    return (
        <div>
           <NavBar />
           <section className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Selected just for you</h1>
                <div>
                    <div className="flex flex-col bg-amber-500/15 p-8 rounded-sm">
                        <p>How constant Innovation Creates Radically Successful Businesses</p>
                        <div className="flex mt-6">
                            <BookCard className="h-35 max-w-35" />
                            <div className="flex flex-col gap-2">
                                <h3 className="font-bold text-md">The Lean Startup</h3>
                                <p className="text-sm">Eric Ries</p>
                                <div className="flex items-center">
                                    <CgPlayButtonO className="flex items-start text-4xl mr-4" />
                                    <span className="font-bold text-sm">3 mins 23 sec</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
           <section className="px-8 py-4">
                <h1 className="py-4 font-bold text-2xl text-black">Recommended For You</h1>
           </section>
        </div>
    )
}