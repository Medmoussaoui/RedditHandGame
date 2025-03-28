import React, { useState, useEffect, useRef } from "react";

const TimerCounter = () => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  // Function to format number with leading zero
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);

      // Animation effect
      if (counterRef.current) {
        counterRef.current.style.transform = "scale(1.1)";
        counterRef.current.style.opacity = "0.7";

        setTimeout(() => {
          if (counterRef.current) {
            counterRef.current.style.transform = "scale(1)";
            counterRef.current.style.opacity = "1";
          }
        }, 200);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const containerStyle: React.CSSProperties = {
    color: "#B0B8D180",
    fontSize: "35px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };

  return (
    <div ref={counterRef} style={containerStyle}>
      {formatNumber(count)}
    </div>
  );
};

export default TimerCounter;
