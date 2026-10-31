
import { FaRegBookmark } from "react-icons/fa";

export default function AddToLibraryButton() {
    return (
        <div className="flex items-center gap-4 text-blue-600 font-bold">
            <FaRegBookmark />
            <p>Add to My Library</p>
        </div>
    )
}