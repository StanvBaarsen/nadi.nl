import fs from 'fs';
import path from 'path';
import { LetterContent, ProposalContent, SignatoriesContent } from '@/types';

const contentDir = path.join(process.cwd(), 'content');

export async function getLetterContent(): Promise<LetterContent> {
  const filePath = path.join(contentDir, 'letter.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getProposalContent(): Promise<ProposalContent> {
  const filePath = path.join(contentDir, 'proposal.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
