import React from 'react';

interface ParagraphBlockProps {
  content: string;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ content }) => {
  return (
    <p 
      className="mb-8 text-xl leading-relaxed text-gray-900"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
