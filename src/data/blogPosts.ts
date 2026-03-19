export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  url?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'global-insurance-platform-lessons',
    title: 'Lessons from Building a Global Insurance Platform',
    publishedAt: '2026-03-11',
    readTime: '6 min read',
    excerpt: 'How I approached maintainability while refactoring shared DTO and data-access layers in a complex insurance domain.',
    tags: ['Java', 'Spring Boot', 'Architecture']
  },
  {
    slug: 'seo-pipelines-and-cms-operations',
    title: 'Async SEO Pipelines and Internal CMS Tooling',
    publishedAt: '2026-02-21',
    readTime: '5 min read',
    excerpt: 'A short write-up on integrating keyword trend data into scalable content workflows for marketing teams.',
    tags: ['Data Pipelines', 'Backend', 'SEO']
  },
  {
    slug: 'cross-system-debugging-playbook',
    title: 'My Cross-System Debugging Playbook',
    publishedAt: '2026-01-29',
    readTime: '7 min read',
    excerpt: 'Practical habits I use to isolate recurring integration failures and improve production reliability across services.',
    tags: ['Reliability', 'Debugging', 'Production']
  }
];

