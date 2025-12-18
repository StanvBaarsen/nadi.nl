'use client';
import React, { useState, useEffect } from 'react';
import { ChapterInfo } from '@/lib/proposalUtils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
    chapters: ChapterInfo[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ chapters }) => {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling past hero (approx 300px to be safe)
            if (window.scrollY > 300) {
                setShowNav(true);
            } else {
                setShowNav(false);
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
         const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px' }
        );

        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [chapters]);

    const activeChapter = chapters.find(c => c.id === activeId) || chapters[0];

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for the fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    if (!showNav) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] lg:hidden transition-all duration-300 ease-in-out transform translate-y-0 font-inter">
            <div 
                className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm px-5 py-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-white" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Huidig Hoofdstuk</span>
                    <span className="font-semibold text-sm truncate text-slate-900 leading-tight">
                        {activeChapter?.title || "Selecteer hoofdstuk"}
                    </span>
                </div>
                <div className={`ml-3 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </div>
            
            {isOpen && (
                <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl max-h-[60vh] overflow-y-auto animate-in slide-in-from-top-2 duration-300">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className={cn(
                                "px-5 py-3.5 cursor-pointer text-sm border-b border-gray-50 last:border-0 active:bg-gray-50 transition-all duration-200",
                                activeId === chapter.id ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-l-blue-600 pl-4" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-6",
                                chapter.isSubchapter ? "pl-8 text-xs" : ""
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                scrollToChapter(chapter.id);
                            }}
                        >
                            {chapter.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default MobileNavigation;
