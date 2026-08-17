import React, { useRef, useEffect } from "react";

interface ChromaKeyVideoProps {
  srcs: string[];
  className?: string;
  size?: number;
  fitMode?: "cover" | "contain";
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  srcs,
  className = "",
  size = 150,
  fitMode = "contain",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // High resolution canvas internal scale (640x640) for native HD rendering quality
    const renderResolution = 640;
    canvas.width = renderResolution;
    canvas.height = renderResolution;

    const playVideo = () => {
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
    };
    playVideo();

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let animId: number;

    const render = () => {
      if (video && !video.paused && !video.ended && video.readyState >= 2) {
        ctx.clearRect(0, 0, renderResolution, renderResolution);

        // Aspect ratio calculation inside canvas based on fitMode
        const vWidth = video.videoWidth || renderResolution;
        const vHeight = video.videoHeight || renderResolution;
        const scale = fitMode === "cover"
          ? Math.max(renderResolution / vWidth, renderResolution / vHeight)
          : Math.min(renderResolution / vWidth, renderResolution / vHeight);
        const drawWidth = vWidth * scale;
        const drawHeight = vHeight * scale;
        const offsetX = (renderResolution - drawWidth) / 2;
        const offsetY = (renderResolution - drawHeight) / 2;

        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

        try {
          const frame = ctx.getImageData(0, 0, renderResolution, renderResolution);
          const data = frame.data;
          const len = data.length;

          // Remove dark background cleanly with smooth edge alpha transition
          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

            if (brightness < 20) {
              data[i + 3] = 0;
            } else if (brightness < 48) {
              const alpha = Math.floor(((brightness - 20) / 28) * 255);
              data[i + 3] = Math.min(data[i + 3], alpha);
            }
          }

          ctx.putImageData(frame, 0, 0);
        } catch (err) {
          // Fallback if canvas read error
        }
      } else if (video && video.paused) {
        video.play().catch(() => {});
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center pointer-events-none select-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
      >
        {srcs.map((src, index) => (
          <source key={index} src={src} />
        ))}
      </video>
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain pointer-events-none ${className}`}
      />
    </div>
  );
};

