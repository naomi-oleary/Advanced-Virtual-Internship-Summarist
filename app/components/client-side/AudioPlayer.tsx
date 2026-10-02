import Controls from '../client-side/Controls';

export default function AudioPlayer({ book }) {

    console.log(book.author)

    return (
        <div className="flex flex-col sticky bottom-0 bg-blue-950 items-center justify-center text-white py-4">
            <div className="flex items-center gap-4">
                <img className="max-h-15" src={book.imageLink}/>
                <div className="text-sm">
                    <p className="font-semibold">{book.title}</p>
                    <p>{book.author}</p>
                </div>
            </div>
            <div className="flex gap-10 text-3xl">
                <Controls book={book} />
            </div>
        </div>
    )
}