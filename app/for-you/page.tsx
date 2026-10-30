import RecommendedBookCard from '../components/UI/RecommendedBookCard';
import SuggestedBooks from '../components/UI/SuggestedBooks';
import NavBar from "../components/client-side/NavBar";
import SelectedBookCard from '../components/UI/SelectedBookCard';
import Footer from '../components/Footer';


export default function ForYouPage() {

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar />
           <div className="flex-row md:absolute md:right-0 md:w-3/4">
                <div className="flex flex-col w-full">
                    <section id="SELECTED" className="px-8 py-4 w-full">
                            <h1 className="py-4 font-bold text-2xl text-black">Selected just for you</h1>
                            <div className="flex justify-center w-full">
                                <SelectedBookCard />
                            </div>

                    </section>
                    <section id="RECOMMENDED" className="px-8 py-4">
                            <h1 className="py-4 font-bold text-2xl text-black">Recommended For You</h1>
                            <div className="relative w-full mx-auto py-10">
                                <RecommendedBookCard />
                            </div>
                    </section>
                    <section id="SUGGESTED" className="px-8 py-4">
                            <h1 className="py-4 font-bold text-2xl text-black">Suggested Books</h1>
                            <div className="relative w-full mx-auto py-10">
                                <SuggestedBooks />
                            </div>
                    </section>
                </div>
            <Footer />
           </div>
        </div>
    )
}