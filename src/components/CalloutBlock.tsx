import React from 'react';

interface CalloutBlockProps {
  content: string;
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({ content }) => {
  return (
    <div className="my-16 sm:my-24 px-4 sm:px-12">
      <blockquote 
        className="text-3xl sm:text-4xl font-serif font-medium text-black leading-tight text-center"
        dangerouslySetInnerHTML={{ __html: `&ldquo;${content}&rdquo;` }}
      />
    </div>
  );
};
