interface Book {
    id: string;
    author: String;
    title: String;
    subTitle: String;
    imageLink: String;
    audioLink: String;
    totalRating: Number;
    averageRating: Number;
    keyIdeas: Number;
    type: String;
    status: String;
    subscriptionRequired: Boolean;
    summary: string;
    tags: string[];
    bookDescription: String;
    authorDescription: String;
}

export default function BookCard() {
    async function getBooks() {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        if (!res.ok) {
            throw new Error('failed to fetch');
        }

        const products: Book[] = await res.json();
    }

    getBooks();
    
    return (
        <div>
            {/* {books.map((book) => 
                <div key={book.id}>
                    {book.title}
                </div>
            )} */}
        </div>
    )
}