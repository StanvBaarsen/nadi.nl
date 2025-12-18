import { Section } from '@/types';

export interface ChapterInfo {
  id: string;
  title: string;
  number: string;
  isUnnumbered: boolean;
  isSubchapter: boolean;
}

export function getChapterInfo(section: Section, index: number): ChapterInfo {
  // Assuming all sections are numbered chapters for now, unless title suggests otherwise
  const isUnnumbered = false; 
  const isSubchapter = false; 
  
  return {
    id: section.id,
    title: section.title,
    number: (index + 1).toString(),
    isUnnumbered,
    isSubchapter
  };
}
