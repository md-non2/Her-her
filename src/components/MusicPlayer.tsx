import React, { useRef, useState, useEffect } from "react";

interface MusicPlayerProps {
  musicUrl: string;
  onMusicUrlChange: (url: string) => void;
}

// Curated collection of high-quality direct streaming media paths for "Dil Ka Jo Haal Hai" (Abhijeet & Shreya Ghoshal)
const FALLBACK_STREAMS: string[] = [
  "https://pagalsongs.in/uploads/128n/dil-ka-jo-haal-hai-besharam.mp3",
  "https://pub-c5e31b5cdafb419a86a69d5d340a995d.r2.dev/Dil-Ka-Jo-Haal-Hai_128.mp3",
  "https://pagalnew.com/download128/6296",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" // Romantic backup keyboard/piano theme if CDN fails
];

export default function MusicPlayer({ musicUrl, onMusicUrlChange }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Track current stream index and play state
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [currentSrc, setCurrentSrc] = useState<string>(musicUrl);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync internal source state when musicUrl changes
  useEffect(() => {
    if (musicUrl) {
      setCurrentSrc(musicUrl);
      setHasError(false);
      setStreamIndex(0);
    } else {
      // If none, default to first stream url
      setCurrentSrc(FALLBACK_STREAMS[0]);
    }
  }, [musicUrl]);

  // Attempt play wrapper with fallback handler
  const attemptPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setHasError(false);
      })
      .catch((err) => {
        console.log("Audio play failed or blocked by browser user interaction policy:", err);
        setIsPlaying(false);
      });
  };

  // Automatic source rotation in case of error (e.g., CORS, geoblock)
  const handleSourceError = () => {
    console.log(`Failed to stream song from URL: ${currentSrc}`);
    const nextIdx = streamIndex + 1;
    if (nextIdx < FALLBACK_STREAMS.length) {
      setStreamIndex(nextIdx);
      const nextUrl = FALLBACK_STREAMS[nextIdx];
      setCurrentSrc(nextUrl);
      console.log(`Cycling stream to fallback ${nextIdx}: ${nextUrl}`);
      // Notify parent state of fallback
      onMusicUrlChange(nextUrl);
    } else {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  // Autoplay on slide mount + interactive key, click, and motion triggers
  useEffect(() => {
    attemptPlay();

    const handleWindowActive = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((err) => {
            console.log("Autoplay failed on active interaction:", err);
          });
      }
    };

    // Listen to all possible interaction vectors for instant autoplay bypass
    window.addEventListener("click", handleWindowActive);
    window.addEventListener("touchstart", handleWindowActive, { passive: true });
    window.addEventListener("keydown", handleWindowActive);
    window.addEventListener("mousemove", handleWindowActive);
    window.addEventListener("scroll", handleWindowActive, { passive: true });

    return () => {
      window.removeEventListener("click", handleWindowActive);
      window.removeEventListener("touchstart", handleWindowActive);
      window.removeEventListener("keydown", handleWindowActive);
      window.removeEventListener("mousemove", handleWindowActive);
      window.removeEventListener("scroll", handleWindowActive);
    };
  }, [currentSrc]);

  return (
    <audio
      ref={audioRef}
      src={currentSrc}
      onError={handleSourceError}
      loop
      playsInline
      className="hidden pointer-events-none"
    />
  );
}
