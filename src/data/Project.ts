import type { TagModel } from './Tag';

export type Project = {
  id: number;
  name: string;
  summary: string;
  description: string;
  projectLink: string;
  pictures: string[];
  tags: TagModel[];
};

