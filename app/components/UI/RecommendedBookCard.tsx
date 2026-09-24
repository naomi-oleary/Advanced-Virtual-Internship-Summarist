interface Book {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
    className?: string;
}

import BookCard from './BookCard';


async function getData(): Promise<Book[]> {
    const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
    if (!res.ok) {
        throw new Error('Failed to fetch Book');
    }

    return res.json() as Promise<Book[]>
}

export default async function RecommendedBooks() {

    const recommendedBooks = await getData();

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap">
            {recommendedBooks && recommendedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}