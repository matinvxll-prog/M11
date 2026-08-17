import React, { useRef, useEffect, useState } from "react";

interface PomodoroVideoPlayerProps {
  src?: string;
  size?: number;
  className?: string;
  isPlaying?: boolean;
  maxTimeCap?: number;
  trimStartSeconds?: number;
  trimEndSeconds?: number;
}

export const PomodoroVideoPlayer: React.FC<PomodoroVideoPlayerProps> = ({
  src = "/d2.webm",
  size = 190,
  className = "",
  isPlaying = true,
  maxTimeCap,
  trimStartSeconds = 0,
  trimEndSeconds = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // Generate fallback list for coffee / break videos and main videos
  const srcCandidates = React.useMemo(() => {
    if (src.includes("coffee")) {
      const candidates = [
        src,
        "/coffee cup.webm",
        "/bhez.webm"
      ];
      return Array.from(new Set(candidates));
    }
    if (src.includes("pizza")) {
      const candidates = [
        src,
        "/pizza.webm",
        "/bhez.webm"
      ];
      return Array.from(new Set(candidates));
    }
    if (src.includes("why")) {
      const candidates = [
        src,
        "/why.webm",
        "/bhez.webm"
      ];
      return Array.from(new Set(candidates));
    }
    if (src.includes("d2") || src.includes("VIDEO")) {
      const candidates = [
        src,
        "/d2.webm",
        "/VIDEO_1.mp4",
        "/VIDEO_11.webm",
        "/VIDEO_22.mp4",
        "/bhez.webm"
      ];
      return Array.from(new Set(candidates));
    }
    return [src, "/bhez.webm", "/dastpek_loop.webm"];
  }, [src]);

  const activeSrc = srcCandidates[fallbackIndex] || srcCandidates[0] || src;

  // Reset error & fallback index whenever primary src prop changes
  useEffect(() => {
    setHasError(false);
    setFallbackIndex(0);
  }, [src]);

  // Default max time cap for START.webm if not explicitly passed (4.4 seconds max)
  const effectiveMaxCap = maxTimeCap ?? (activeSrc.includes("START") ? 4.4 : undefined);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let direction: "forward" | "reverse" = "forward";
    const frames: HTMLCanvasElement[] = [];
    let reverseIndex = 0;
    let lastCaptureTime = 0;
    let lastReverseFrameTime = 0;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = size * dpr;
    const canvasHeight = size * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const lastFrameCanvas = document.createElement("canvas");
    lastFrameCanvas.width = canvasWidth;
    lastFrameCanvas.height = canvasHeight;
    const lastFrameCtx = lastFrameCanvas.getContext("2d");
    let hasLastFrame = false;

    const drawCover = (
      targetCtx: CanvasRenderingContext2D,
      source: HTMLVideoElement | HTMLCanvasElement,
      cw: number,
      ch: number
    ) => {
      const nw = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
      const nh = source instanceof HTMLVideoElement ? source.videoHeight : source.height;
      if (!nw || !nh) return false;

      const targetAspect = cw / ch;
      const sourceAspect = nw / nh;

      let sx = 0, sy = 0, sw = nw, sh = nh;

      if (sourceAspect > targetAspect) {
        sw = nh * targetAspect;
        sx = (nw - sw) / 2;
      } else {
        sh = nw / targetAspect;
        sy = (nh - sh) / 2;
      }

      targetCtx.clearRect(0, 0, cw, ch);
      targetCtx.save();
      targetCtx.beginPath();
      targetCtx.arc(cw / 2, ch / 2, Math.min(cw, ch) / 2, 0, Math.PI * 2);
      targetCtx.clip();
      targetCtx.drawImage(source, sx, sy, sw, sh, 0, 0, cw, ch);
      targetCtx.restore();
      return true;
    };

    const initVideo = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        video.playsInline = true;
        if (video.readyState >= 1) {
          video.currentTime = Math.max(0, trimStartSeconds);
        }
        if (isPlaying) {
          await video.play();
        } else {
          video.pause();
        }
      } catch (err) {
        console.warn("Video play error:", err);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.readyState >= 1 && trimStartSeconds > 0) {
        try {
          video.currentTime = Math.max(0, trimStartSeconds);
        } catch (e) {
          // Ignore seeking error before load completion
        }
      }
      if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    initVideo();

    const loop = (now: number) => {
      if (video && isPlaying) {
        const duration = video.duration || 5;
        const minTime = Math.max(0, Math.min(trimStartSeconds, Math.max(0, duration - 0.4)));
        let maxLimit = duration - Math.max(0.05, trimEndSeconds);
        if (effectiveMaxCap && effectiveMaxCap > 0) {
          maxLimit = Math.min(maxLimit, effectiveMaxCap);
        }
        const maxTime = Math.max(minTime + 0.3, Math.min(duration - 0.05, maxLimit));

        if (direction === "forward") {
          const isSeekingOrBuffering = video.seeking || video.readyState < 2;

          if (isSeekingOrBuffering) {
            // While seeking back to start or waiting for buffer, render start frame or last valid frame
            if (frames.length > 0 && frames[0]) {
              ctx.clearRect(0, 0, canvasWidth, canvasHeight);
              ctx.drawImage(frames[0], 0, 0, canvasWidth, canvasHeight);
            } else if (hasLastFrame && lastFrameCanvas) {
              ctx.clearRect(0, 0, canvasWidth, canvasHeight);
              ctx.drawImage(lastFrameCanvas, 0, 0, canvasWidth, canvasHeight);
            }
          } else {
            if (video.paused && !video.ended) {
              video.play().catch(() => {});
            }
            if (video.currentTime < minTime && video.readyState >= 1) {
              video.currentTime = minTime;
            }

            // Render live video to main canvas with object-cover
            const drawn = drawCover(ctx, video, canvasWidth, canvasHeight);
            if (drawn) {
              hasLastFrame = true;
              if (lastFrameCtx) {
                drawCover(lastFrameCtx, video, canvasWidth, canvasHeight);
              }

              // Capture frame into buffer every ~33ms
              if (now - lastCaptureTime >= 33) {
                lastCaptureTime = now;
                const offscreen = document.createElement("canvas");
                offscreen.width = canvasWidth;
                offscreen.height = canvasHeight;
                const offCtx = offscreen.getContext("2d");
                if (offCtx) {
                  drawCover(offCtx, video, canvasWidth, canvasHeight);
                  frames.push(offscreen);
                }
              }
            } else if (hasLastFrame && lastFrameCanvas) {
              ctx.clearRect(0, 0, canvasWidth, canvasHeight);
              ctx.drawImage(lastFrameCanvas, 0, 0, canvasWidth, canvasHeight);
            }

            // Transition smoothly to reverse when reaching max time cap or end
            if (video.currentTime >= maxTime || video.ended || (duration > 0 && video.currentTime >= duration - 0.05)) {
              direction = "reverse";
              video.pause();
              reverseIndex = frames.length - 1;
              lastReverseFrameTime = now;
            }
          }
        } else {
          // Reverse direction using stored frame buffer (smooth & stutter-free)
          if (!video.paused) {
            video.pause();
          }

          if (now - lastReverseFrameTime >= 33) {
            lastReverseFrameTime = now;
            reverseIndex--;
          }

          if (reverseIndex >= 0 && frames[reverseIndex]) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(frames[reverseIndex], 0, 0, canvasWidth, canvasHeight);
            if (lastFrameCtx) {
              lastFrameCtx.clearRect(0, 0, canvasWidth, canvasHeight);
              lastFrameCtx.drawImage(frames[reverseIndex], 0, 0, canvasWidth, canvasHeight);
            }
            hasLastFrame = true;
          }

          if (reverseIndex <= 0 || frames.length === 0) {
            direction = "forward";
            const startFrame = frames.length > 0 ? frames[0] : null;
            frames.length = 0;
            if (startFrame) {
              frames.push(startFrame);
            }
            if (video.readyState >= 1) {
              video.currentTime = minTime;
            }
            video.play().catch(() => {});
            lastCaptureTime = now;
          }
        }
      } else if (video && !isPlaying) {
        video.pause();
        if (hasLastFrame && lastFrameCanvas) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(lastFrameCanvas, 0, 0, canvasWidth, canvasHeight);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      frames.length = 0;
    };
  }, [isPlaying, activeSrc, effectiveMaxCap, size, trimStartSeconds, trimEndSeconds]);

  const handleVideoError = () => {
    if (fallbackIndex + 1 < srcCandidates.length) {
      setFallbackIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return null;
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`relative rounded-full overflow-hidden flex items-center justify-center pointer-events-none select-none border-2 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.4)] isolate transform-gpu ${className}`}
    >
      {/* Canvas for butter-smooth 60fps forward and reverse ping-pong loop */}
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="w-full h-full object-cover rounded-full pointer-events-none select-none isolate transform-gpu relative z-10"
      />

      {/* Video element - kept rendered in DOM for canvas capture, but hidden visually so it never causes clip-path or double-layer edge bleeding */}
      <video
        ref={videoRef}
        src={activeSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onError={handleVideoError}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none select-none opacity-0 -z-10"
      />
    </div>
  );
};

