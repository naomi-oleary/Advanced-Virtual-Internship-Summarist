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

async function getRecommendedBooks(): Promise<Book[]> {
        const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }

        return res.json() as Promise<Book[]>
    }

async function getSuggestedBooks(): Promise<Book[]> {
        const res = await  fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
        console.log(res)
        if (!res.ok) {
            throw new Error('Failed to fetch Book');
        }

        return res.json() as Promise<Book[]>
    }

async function getData() {
    const selectedBook = getSelectedBook();
    const recommendedBooks = getRecommendedBooks();
    const suggestedBooks = getSuggestedBooks();

    return { selectedBook, recommendedBooks, suggestedBooks };
}

export default async function BookCard () {
    

    const { selectedBook, recommendedBooks, suggestedBooks } = await getData();

    return {selectedBook, recommendedBooks, suggestedBooks}
}