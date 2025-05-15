// src/components/ScrollingText.js
import React, { useEffect, useRef } from 'react';
import './ScrollingText.css';

const ScrollingText = ({ text, direction }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const container = textElement.parentElement;
    if (!container) return;

    // This is a basic implementation. For a true loop, CSS animations are better.
    // However, for demonstration, we'll use a simple interval.
    const scrollSpeed = direction === 'left' ? -1 : 1;
    const scrollInterval = setInterval(() => {
      if (direction === 'left') {
        if (container.scrollLeft >= textElement.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      } else {
           if (container.scrollLeft <= 0) {
               container.scrollLeft = textElement.scrollWidth - container.clientWidth;
           } else {
              container.scrollLeft += scrollSpeed;
           }
      }

    }, 20);

    return () => clearInterval(scrollInterval);
  }, [text, direction]);

  return (
    <div className="scrolling-text-container">
      <span ref={textRef} className="scrolling-text">{text}</span>
    </div>
  );
};

export default ScrollingText; 