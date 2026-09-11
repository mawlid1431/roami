"use client";

import { useEffect, useRef } from "react";

interface AmbientVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Manual loop that fades in over the first and out over the last 0.5s, instead of a hard `loop` cut. */
  fade?: boolean;
}

const FADE_SECONDS = 0.5;
const RESTART_DELAY_MS = 100;

export function AmbientVideo({ src, poster, className, fade = false }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.style.opacity = "1";
      return;
    }
    // play() is refused while the page is hidden (e.g. opened in a background
    // tab) and nothing retries it, so retry once visible and once data arrives.
    // A refusal that sticks (data saver) just leaves the poster up.
    const tryPlay = () => {
      if (document.visibilityState === "visible" && video.paused && !video.ended) video.play().catch(() => {});
    };
    const abort = new AbortController();
    document.addEventListener("visibilitychange", tryPlay, { signal: abort.signal });
    video.addEventListener("canplay", tryPlay, { signal: abort.signal });
    tryPlay();

    let frame = 0;
    let restart = 0;
    if (fade) {
      const track = () => {
        const { currentTime, duration } = video;
        if (duration) {
          const edge = Math.min(currentTime, duration - currentTime) / FADE_SECONDS;
          video.style.opacity = String(Math.max(0, Math.min(1, edge)));
        }
        frame = requestAnimationFrame(track);
      };
      video.addEventListener("ended", () => {
        video.style.opacity = "0";
        restart = window.setTimeout(() => {
          video.currentTime = 0;
          video.play().catch(() => {});
        }, RESTART_DELAY_MS);
      }, { signal: abort.signal });
      frame = requestAnimationFrame(track);
    }

    return () => {
      abort.abort();
      cancelAnimationFrame(frame);
      window.clearTimeout(restart);
    };
  }, [fade]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      style={fade ? { opacity: 0 } : undefined}
      loop={!fade}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
