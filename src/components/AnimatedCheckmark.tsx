'use client';

import React, { useEffect, useState } from 'react';

export const AnimatedCheckmark = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-24 h-24 flex items-center justify-center transition-transform duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
      <svg
        className="w-full h-full text-green-500"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={`origin-center transition-all duration-1000 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          cx="26"
          cy="26"
          r="25"
          fill="#22c55e"
          fillOpacity="0.1"
        />
        <path
          className="checkmark-path"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          style={{
            strokeDasharray: 48,
            strokeDashoffset: isVisible ? 0 : 48,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.65, 0, 0.45, 1) 0.2s'
          }}
        />
      </svg>
    </div>
  );
};
