import React from 'react';

interface LetterHeaderProps {
  title: string;
  subtitle: string;
  date: string;
}

export const LetterHeader: React.FC<LetterHeaderProps> = ({ title, subtitle, date }) => {
  return (
    <header className="mb-16 sm:mb-24">
      <div className="mt-8 text-sm font-mono text-gray-400 uppercase tracking-widest">
        {date}
      </div>
      <h1 className="mb-8 text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
        {title}
      </h1>
      <p className="text-2xl sm:text-3xl leading-normal text-gray-600 font-light max-w-2xl">
        {subtitle}
      </p>
    </header>
  );
};
