import NavBar from "../components/client-side/NavBar";
import Footer from "../components/Footer";

export default function LibraryPage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar />
           <div className="flex-row md:absolute md:right-0 md:w-3/4">
                <div className="flex flex-col w-full md:mt-20">
                    <div className="text-blue-950 p-8">
                        <h1 className="text-xl font-bold py-4">My Library</h1>
                        <div>
                            
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}