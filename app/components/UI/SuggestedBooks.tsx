import BookCard from './BookCard';

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

async function getSuggestedBooks(): Promise<Book[]> {
        const res = await  fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }

        return res.json() as Promise<Book[]>
    }

getSuggestedBooks();

export default async function SuggestedBooks() {
    const suggestedBooks = await getSuggestedBooks();

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap">
            {Array.isArray(suggestedBooks) && suggestedBooks.map((book) => (
                <BookCard book={book} key={book.id} />
            ))}  
        </div>
    )
}