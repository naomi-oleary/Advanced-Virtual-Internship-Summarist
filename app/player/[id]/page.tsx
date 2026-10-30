interface PageProps {
    params: Promise<{ id: string }>;
}

import AudioPlayer from "@/app/components/client-side/AudioPlayer";
import NavBar from "../../components/client-side/NavBar";
import Footer from "@/app/components/Footer";

export default async function PlayerPage({ params }: PageProps ) {
    const { id } = await params;
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
    const book = await res.json();

    console.log(book)

    return (
        <div className="flex flex-col min-h-screen w-full">
           <NavBar />
           <div className="flex-row md:absolute md:right-0 md:w-3/4">
                <div className="flex flex-col w-full mt-20">
                    <div className="px-4">
                        <h1 className="font-bold text-xl py-6">{book.title}</h1>
                        <hr className="border-t border-gray-300" />
                        <p className="py-6 whitespace-pre-line text-sm">{book.summary}</p>
                    </div>
                    <div className="sticky bottom-0 h-1/5">
                        <AudioPlayer book={book} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}