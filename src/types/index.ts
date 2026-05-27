export interface LetterContent {
  meta: {
    title: string;
    subtitle: string;
    date: string;
  };
  sections: Section[];
  cta: {
    headline: string;
    description: string;
    buttonText: string;
  };
}

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export type Block = 
  | { type: 'paragraph'; content: string }
  | { type: 'text'; content: string }
  | { type: 'callout'; content: string }
  | { type: 'list'; items: string[] };

export interface ProposalContent {
  meta: {
    title: string;
    subtitle: string;
  };
  sections: Section[];
}

export type ProposalSection = Section;
export type ProposalBlock = Block;
export type LetterSection = Section;
