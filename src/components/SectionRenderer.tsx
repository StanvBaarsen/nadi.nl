import React from 'react';
import { ParagraphBlock } from './ParagraphBlock';
import { CalloutBlock } from './CalloutBlock';
import { ListBlock } from './ListBlock';
import { Block } from '@/types';

interface SectionRendererProps {
  block: Block;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
    case 'text':
      return <ParagraphBlock content={block.content} />;
    case 'callout':
      return <CalloutBlock content={block.content} />;
    case 'list':
      return <ListBlock items={block.items} />;
    default:
      const unknownBlock = block as { type: string };
      console.warn(`Unknown block type: ${unknownBlock.type}`);
      return null;
  }
};
