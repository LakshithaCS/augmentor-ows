import { useEffect, useRef, useState } from "react";

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const ref = useRef(null);

  // Detect when element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.5 } // 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Animate counter when triggered
  useEffect(() => {
    if (!startCount) return;

    let current = 0;
    const duration = 2000; // 2s animation
    const stepTime = 20;   // update every 20ms
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startCount, value]);

  return <span ref={ref}>{count}</span>;
}

export default Counter;
