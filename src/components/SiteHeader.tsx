'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const SiteHeader: React.FC<HeaderProps> = ({ className = '', children }) => {
  const pathname = usePathname();
  const currentPath = pathname;
  
  // Navigation state for sliding underline
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const linkRefs = React.useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const targetPath = hoveredPath || currentPath;
    const targetLink = linkRefs.current[targetPath];

    if (targetLink && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();

      setUnderlineStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1
      });
    } else {
      // If no target (e.g. on home page and not hovering), hide underline
      setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredPath, currentPath, mounted]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const navLinks = [
    { path: '/', label: 'Petitie' },
    { path: '/voorstel', label: 'Hoe werkt NADI?' },
  ];

  return (
    <>
      <header className={`absolute top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/5 flex justify-between items-center py-5 px-6 md:px-12 transition-colors duration-1000 ease-out ${className}`}>
        <div>
          <Link 
            href="/" 
            className="flex items-center gap-3 text-3xl font-semibold tracking-tighter text-black font-display relative z-50"
          >
            <Image 
              src="/logo.svg" 
              alt="NADI Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto drop-shadow-md"
            />
            <span className="tracking-wider">NADI</span>
          </Link>
        </div>

        {/* Center Navigation - Desktop */}
        <div 
          ref={navRef}
          className="absolute hidden min-[500px]:grid grid-flow-col auto-cols-[1fr] left-1/2 transform -translate-x-1/2 items-center gap-2 lg:gap-8"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              ref={el => { linkRefs.current[link.path] = el }}
              onMouseEnter={() => setHoveredPath(link.path)}
              className="font-inter text-md px-2 py-2 relative z-10 text-center flex justify-center items-center whitespace-nowrap text-sm font-medium text-gray-900 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Sliding Underline */}
          <div 
            className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              opacity: underlineStyle.opacity
            }}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4 relative z-50">
          
          {/* Mobile Menu Button */}
          <button 
            className="min-[500px]:hidden p-2 text-gray-900 relative w-10 h-10 flex items-center justify-center z-[70]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu 
              size={24} 
              className={`absolute transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`} 
            />
            <X 
              size={24} 
              className={`absolute transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`} 
            />
          </button>
          
          {children}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 bg-white z-[60] pt-24 px-6 min-[500px]:hidden flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <button 
            className="absolute top-5 right-6 p-2 text-gray-900 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-2xl font-display font-medium border-b border-gray-100 pb-4 transition-all duration-500 ${
                isActive(link.path) ? 'text-blue-600' : 'text-gray-900'
              } ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
