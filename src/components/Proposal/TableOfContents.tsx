'use client';
import React, { useEffect, useState } from 'react';
import { ChapterInfo } from '@/lib/proposalUtils';
import { cn, smoothScrollTo } from '@/lib/utils';
import { ChevronLeft, List } from 'lucide-react';

interface TableOfContentsProps {
    chapters: ChapterInfo[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ chapters, isOpen, setIsOpen }) => {
    const [activeId, setActiveId] = useState<string>('');

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

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - 100; // Header + 12px padding
            smoothScrollTo(y, 800);
        }
    };

    const activeIndex = chapters.findIndex(c => c.id === activeId);
    
    // Determine active parent index
    let activeParentIndex = -1;
    if (activeIndex >= 0) {
        for (let i = activeIndex; i >= 0; i--) {
            if (!chapters[i].isSubchapter) {
                activeParentIndex = i;
                break;
            }
        }
    }

    let currentParentIndex = -1;

    // Filter visible chapters first to handle first/last logic correctly for lines
    const visibleChapters = chapters.map((chapter, idx) => {
        if (!chapter.isSubchapter) {
            currentParentIndex = idx;
        }
        const isChildOfActiveParent = currentParentIndex === activeParentIndex;
        const isVisible = !chapter.isSubchapter || isChildOfActiveParent;
        return { ...chapter, originalIndex: idx, isVisible };
    }).filter(c => c.isVisible);

    return (
        <nav className="h-full flex flex-col relative border-r border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className={cn(
                "flex items-center mb-6 px-2 transition-all duration-300 z-50 lg:hidden",
                isOpen ? "justify-end relative" : "absolute left-4 top-0"
            )}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center justify-center w-10 h-10 bg-white border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 text-gray-600 transition-all",
                        !isOpen && "shadow-md hover:scale-105"
                    )}
                    aria-label={isOpen ? "Verberg inhoudsopgave" : "Toon inhoudsopgave"}
                >
                    {isOpen ? <ChevronLeft size={20} /> : <List size={20} />}
                </button>
            </div>

            <div className={cn(
                "flex-1 overflow-y-auto scrollbar-hide transition-opacity duration-300 flex flex-col pt-8",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
            )}>
                <div className="relative pt-8 pl-4 flex flex-col gap-0 pr-4 pb-8">
                    {visibleChapters.map((chapter, idx) => {
                        const isActive = activeId === chapter.id;
                        const isPast = activeIndex > chapter.originalIndex;
                        const isLast = idx === visibleChapters.length - 1;
                        
                        return (
                            <div
                                key={`${chapter.id}-${chapter.originalIndex}`}
                                className="group flex items-stretch cursor-pointer"
                                onClick={() => scrollToChapter(chapter.id)}
                            >
                                {/* Timeline Column */}
                                <div className="flex flex-col items-center mr-4 w-4 flex-shrink-0 relative">
                                    {/* Top Line */}
                                    <div className={cn(
                                        "w-[2px] flex-1 transition-colors duration-500",
                                        idx === 0 ? "bg-transparent" : (isPast || isActive ? "bg-[#315FD8]" : "bg-gray-200")
                                    )} />
                                    
                                    {/* Marker */}
                                    <div className={cn(
                                        "z-10 transition-all duration-300 box-border border-2",
                                        chapter.isSubchapter ? "w-2 h-2 rounded-full" : "w-3 h-3 rounded-sm",
                                        isActive 
                                            ? "bg-[#315FD8] border-[#315FD8] scale-125" 
                                            : (isPast ? "bg-[#315FD8] border-[#315FD8]" : "bg-white border-gray-300")
                                    )} />

                                    {/* Bottom Line */}
                                    <div className={cn(
                                        "w-[2px] flex-1 transition-colors duration-500",
                                        isLast ? "bg-transparent" : (isPast ? "bg-[#315FD8]" : "bg-gray-200")
                                    )} />
                                </div>

                                {/* Content Column */}
                                <div className={cn(
                                    "flex-1 transition-all duration-200 leading-tight flex flex-col justify-center",
                                    isActive ? "text-[#315FD8] font-medium" : "text-slate-500 group-hover:text-slate-700",
                                    chapter.isSubchapter ? "py-1 pl-2 text-xs" : "py-2 text-sm"
                                )}>
                                    <span className="flex items-baseline">

                                        <span>{chapter.title}</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default TableOfContents;
