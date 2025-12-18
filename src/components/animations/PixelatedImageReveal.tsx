'use client';
import React, { useEffect, useState } from 'react';

interface PixelatedImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  gridSize?: number;
}

export default function PixelatedImageReveal({ src, alt, className, delay = 0 }: PixelatedImageRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
