import React, { useState, useEffect } from 'react';
import { Signatory } from '@/types';

interface SignatoriesListProps {
  signatories: Signatory[];
}

export const SignatoriesList: React.FC<SignatoriesListProps> = ({ signatories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const recentSignatories = React.useMemo(() => {
    let sorted = [...signatories];
    
    // If we have created_at, sort by it (newest first)
    if (sorted.some(s => s.created_at)) {
        sorted.sort((a, b) => {
            if (a.created_at && b.created_at) {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
        });
    } else {
        // Fallback: assume input is oldest first, so reverse to get newest first
        sorted.reverse();
    }

    return sorted.map((sig, i) => {
      let timeAgo = `${i * 3 + 2} minuten geleden`;
      
      if (sig.created_at) {
          const date = new Date(sig.created_at);
          const now = new Date();
          const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
          
          if (diffInSeconds < 60) {
              timeAgo = 'zojuist';
          } else if (diffInSeconds < 3600) {
              timeAgo = `${Math.floor(diffInSeconds / 60)} minuten geleden`;
          } else if (diffInSeconds < 86400) {
              timeAgo = `${Math.floor(diffInSeconds / 3600)} uur geleden`;
          } else {
              timeAgo = `${Math.floor(diffInSeconds / 86400)} dagen geleden`;
          }
      }
      
      return {
          ...sig,
          timeAgo
      };
    });
  }, [signatories]);
  
  // Create pairs
  const pairs = [];
  for (let i = 0; i < recentSignatories.length; i += 2) {
    pairs.push(recentSignatories.slice(i, i + 2));
  }

  useEffect(() => {
    if (pairs.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pairs.length);
        setIsVisible(true);
      }, 500); // Wait for fade out
      
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [pairs.length]);

  const currentPair = pairs[currentIndex] || [];

  return (
    <div className="min-h-[40px] flex flex-col justify-start mb-6">
      <div 
        className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="space-y-4">
          {currentPair.map((signatory, index) => (
            <div key={`${currentIndex}-${index}`} className="flex justify-between items-baseline border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <div className="font-bold text-sm text-black truncate pr-4">
                {signatory.name}
              </div>
              <div className="text-xs font-mono text-gray-400 whitespace-nowrap shrink-0">
                {signatory.timeAgo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
