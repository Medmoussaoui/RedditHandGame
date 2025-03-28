import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
}

function CountdownTimer({
  initialSeconds = 10,
  onComplete,
}: CountdownTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Reset when initial seconds change
    setRemainingSeconds(initialSeconds);

    // If no seconds left, call onComplete
    if (remainingSeconds <= 0) {
      onComplete?.();
      return;
    }

    // Create interval to decrement seconds
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval
    return () => clearInterval(timer);
  }, [initialSeconds, onComplete]);

  return (
    <div
      style={{
        fontSize: "20px",
        fontWeight: "100",
        color: "#B0B8D1",
      }}
    >
      Think Fast! You Have{" "}
      <span
        style={{
          color: "#9B59B6",
        }}
      >
        {remainingSeconds} Sec
      </span>{" "}
    </div>
  );
}

export default CountdownTimer;
