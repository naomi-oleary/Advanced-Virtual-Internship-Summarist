interface PageProps {
    params: Promise<{ id: string }>;
}

import NavBar from "../../components/client-side/NavBar";

export default async function PlayerPage({ params }: PageProps ) {
    const { id } = await params;
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
    const book = await res.json();

    console.log(book)

    return (
        <div>
            <NavBar />
            <h1>{book.title}</h1>
            <hr className="border-t border-gray-300" />
            <p>{book.summary}</p>
        </div>
    )
}