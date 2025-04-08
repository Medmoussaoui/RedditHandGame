import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface ProgressBarTimerProps {
  ms: number;
  color?: string;
  height?: number;
  onComplete?: () => void;
}

function ProgressBarTimer({
  ms,
  color = "#8E44AD",
  height = 4,
  onComplete,
}: ProgressBarTimerProps) {
  const [width, setWidth] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset
    setWidth(0);
    startTimeRef.current = null;

    // Animation function
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;

      const elapsedTime = currentTime - startTimeRef.current;
      const newWidth = Math.min((elapsedTime / ms) * 100, 100);

      setWidth(newWidth);

      if (elapsedTime < ms) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ms]);

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}%`,
        backgroundColor: color,
        borderRadius: "10px",
        transition: "width 0s", // Remove transition for smooth animation
      }}
    />
  );
}

export default ProgressBarTimer;
