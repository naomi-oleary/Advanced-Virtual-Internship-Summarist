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
            className="fixed inset-0 m-auto w-full max-w-md p-0 bg-transparent rounded-sm backdrop:bg-black/75 shadow-xl outline-none border-none">
                <div className="relative p-6 bg-white w-full text-left">
                    {children}
                </div>
        </dialog>
    );
}