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

async function getSelectedBook(): Promise<Book[]> {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }

        return res.json() as Promise<Book[]>
    }

export default async function BookCard ({ className = "not-visited:" }) {
    const books = await getSelectedBook();
    
    return (
        <div className={className}>
            {books.map((book) => (
                <li key={book.id} className="list-none">
                    <img src={book.imageLink} />
                    <div>
                        
                    </div>
                </li>
            ))}
        </div>
    )
}