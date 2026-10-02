'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

export default function Controls({ book }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playAnimationRef = useRef<number | null>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

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
        <div className="flex flex-col items-center">
            <div className="flex py-4 gap-10">
                <audio 
                    src={book.audioLink} 
                    ref={audioRef} 
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                />
                <button onClick={rewind10}>
                    <TbRewindBackward10 size={20} />
                </button>
                <button onClick={togglePlayPause}>
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
            <div className="flex items-center gap-10 text-sm">
                <span>{formatTime(currentTime)}</span>
                <input 
                    type="range"
                    ref={progressBarRef}
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleProgressChange}
                />
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    )
}