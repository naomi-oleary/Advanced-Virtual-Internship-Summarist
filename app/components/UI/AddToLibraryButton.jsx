import { FaRegBookmark } from "react-icons/fa";

export default function AddToLibraryButton({ onAdd }) {

    return (
        <div>
            <div 
                className="flex items-center gap-4 text-blue-600 font-bold"
                onClick={onAdd}
            >
                <FaRegBookmark />
                <p>Add to My Library</p>
            </div>
        </div>
    )
}