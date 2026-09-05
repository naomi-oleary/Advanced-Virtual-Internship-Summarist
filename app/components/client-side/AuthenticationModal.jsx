"use client";

import { useEffect, useRef } from 'react';

export default function AuthenticationModal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target ===dialogRef.current) {
            onClose();
        }
    }
    
    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleBackdropClick}
            className="rounded-sm backdrop:bg-black/75 shadow-xl outline-none border-none">
                <div className="p-6 bg-white max-w-md w-full">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-black hover:text-gray-800 text-lg font-bold">
                        x
                    </button>
                    {children}
                </div>
        </dialog>
    );
}