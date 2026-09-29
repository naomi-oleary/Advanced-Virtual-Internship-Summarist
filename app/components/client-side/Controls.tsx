'use client'

import { useState, useRef, useEffect } from 'react';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

export default function Controls({ book }) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch((error) => {
                console.error("Audio playback failed:", error);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const fastForward10 = (): void => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 10,
                audioRef.current.duration || 0
            );
        }
    }

    const rewind10 = (): void => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
                audioRef.current.currentTime - 10,
                0
            );
        }
    }

    return (
        <div className="flex gap-4 items-center">
            <audio src={book.audioLink} ref={audioRef} />
            <button onClick={rewind10}>
                <TbRewindBackward10 size={20} />
            </button>
            <button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? (
                    <BsFillPauseFill size={30} />
                ) : (
                    <BsFillPlayFill size={30} />
                )}
            </button>
            <button onClick={fastForward10}>
                <TbRewindForward10 size={20} />
            </button>
        </div>
    )
}