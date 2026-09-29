import Controls from '../client-side/Controls';
import ProgressBar from '../client-side/ProgressBar';

export default function AudioPlayer({ book }) {

    console.log(book.author)

    return (
        <div className="flex flex-col sticky bottom-0 bg-blue-950 items-center justify-center text-white ">
            <div className="flex items-center p-4 gap-4">
                <img className="max-h-15" src={book.imageLink}/>
                <div className="text-sm">
                    <p className="font-semibold">{book.title}</p>
                    <p>{book.author}</p>
                </div>
            </div>
            <div className="flex gap-10 py-3 text-3xl">
                <Controls book={book} />
                <ProgressBar />
            </div>
            <div>

            </div>

        </div>
    )
}