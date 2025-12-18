'use client';
import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        smoothScrollTo(0, 800);
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
            aria-label="Scroll to top"
        >
            <ChevronUp size={24} className="text-gray-600" />
        </button>
    );
};
