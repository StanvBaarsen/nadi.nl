import React from 'react';

interface ListBlockProps {
  items: string[];
}

export const ListBlock: React.FC<ListBlockProps> = ({ items }) => {
  return (
    <ul className="mb-8 list-disc pl-6 space-y-3 text-xl leading-relaxed text-gray-900 marker:text-gray-400">
      {items.map((item, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
};
