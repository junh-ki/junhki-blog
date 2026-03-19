export type TagModel = {
  key: string;
  color: string;
};

export const Tag: Record<string, TagModel> = {
  TYPESCRIPT: { key: 'TypeScript', color: 'darkred' },
  JAVASCRIPT: { key: 'JavaScript', color: 'orange' },
  JAVA: { key: 'Java', color: 'orange' },
  GO: { key: 'Go', color: 'grey' },
  PYTHON: { key: 'Python', color: 'pink' },
  NODEJS: { key: 'Node.JS', color: 'brown' },
  CSHARP: { key: 'C#', color: 'green' },
  ASPNET: { key: 'ASP.NET', color: 'purple' },
  ANGULAR: { key: 'Angular', color: 'red' },
  REACT: { key: 'React', color: 'darkred' },
  VUE: { key: 'VUE', color: 'crimson' },
  SPRING: { key: 'Spring Boot', color: 'firebrick' },
  DJANGO: { key: 'Django', color: 'darkgreen' }
};

