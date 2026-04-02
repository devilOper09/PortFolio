import { useState, useRef, useEffect, useCallback } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Start audio on first user interaction (click, scroll, keydown)
  const startAudio = useCallback(() => {
    if (started) return;
    setStarted(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [started]);

  useEffect(() => {
    const events = ['click', 'scroll', 'keydown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, startAudio, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, startAudio));
  }, [startAudio]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // Keyboard shortcut: M to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        if (started) {
          e.stopPropagation();
          const audio = audioRef.current;
          if (!audio) return;
          if (playing) {
            audio.pause();
            setPlaying(false);
          } else {
            audio.play().then(() => setPlaying(true)).catch(() => {});
          }
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, playing]);

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}ballz.mp3`} loop preload="auto" />

      {/* Persistent mute/unmute toggle — bottom right */}
      {started && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-[9998] bg-transparent border-none p-2 transition-opacity duration-200 hover:opacity-70"
          aria-label={playing ? 'Mute audio' : 'Unmute audio'}
          id="btn-audio-toggle"
        >
          {playing ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF4500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,69,0,0.15)" stroke="#FF4500" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(240, 238, 230, 0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(240,238,230,0.05)" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
