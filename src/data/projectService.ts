import type { Project } from './Project';
import { Tag, type TagModel } from './Tag';

const projects: Project[] = [
  {
    id: 0,
    name: 'Global Liability Insurance Platform (HDI AG)',
    pictures: [],
    projectLink: 'https://www.linkedin.com/in/junh-ki/',
    summary: 'Built key features for a global insurance platform managing liability products across multiple countries.',
    description:
      'Led backend and fullstack delivery for insurance product workflows, including document-heavy business processes. Implemented async processing and improved maintainability by refactoring DTO and data-access layers shared across controllers and services.',
    tags: [Tag.JAVA, Tag.SPRING, Tag.TYPESCRIPT]
  },
  {
    id: 1,
    name: 'AI-assisted Document Migration Pipeline (HDI AG)',
    pictures: [],
    projectLink: 'https://www.linkedin.com/in/junh-ki/',
    summary: 'Migrated legacy insurance documents with AI-assisted extraction, conversion, and async orchestration.',
    description:
      'Built an end-to-end migration flow for insurance documentation: AI model training support, PDF conversion, asynchronous job processing, and operational infrastructure setup. The implementation reduced manual migration effort and improved data consistency.',
    tags: [Tag.JAVA, Tag.SPRING, Tag.TYPESCRIPT]
  },
  {
    id: 2,
    name: 'SEO Platform and CMS Tooling (Holidu)',
    pictures: [],
    projectLink: 'https://www.holidu.com',
    summary: 'Delivered SEO-focused platform capabilities and internal CMS tooling used by global marketing teams.',
    description:
      'Implemented backend services and frontend tooling to accelerate SEO content operations at scale. Worked on data pipelines integrating keyword trends and ad performance signals, then fed insights into cached data for dynamic content generation.',
    tags: [Tag.JAVA, Tag.REACT, Tag.TYPESCRIPT]
  },
  {
    id: 3,
    name: 'Observability and Service Reliability (Holidu)',
    pictures: [],
    projectLink: 'https://www.holidu.com',
    summary: 'Introduced monitoring and alerting for distributed services and supported modularization toward microservices.',
    description:
      'Set up real-time observability dashboards and alerting to improve incident response. Contributed to monolith-to-microservice migration work, reducing deployment bottlenecks across teams and enabling better ownership boundaries.',
    tags: [Tag.JAVA, Tag.SPRING]
  },
  {
    id: 4,
    name: 'NOx Anti-Tampering Diagnostic System (Bosch)',
    pictures: [],
    projectLink: 'https://ceur-ws.org/Vol-3028/D2-02-ESAAMM_2021_paper_3.pdf',
    summary: 'Designed and implemented a PoC system for detecting emission fraud from CAN data to cloud visualization.',
    description:
      'Implemented data capture and diagnostic logic for anti-tampering detection, and delivered a cloud-connected visualization stack with documentation. This work contributed to an award-winning research paper at Eclipse SAAM Mobility 2021.',
    tags: [Tag.JAVA, Tag.PYTHON]
  },
  {
    id: 5,
    name: 'Multi-service Product Delivery and Mentoring (KoSyMa)',
    pictures: [],
    projectLink: 'https://www.linkedin.com/in/junh-ki/',
    summary: 'Delivered backend/frontend features in a startup multi-service architecture with strong production reliability focus.',
    description:
      'Worked across service boundaries to resolve integration issues and improve robustness. Also helped raise engineering standards via structured code reviews and mentoring in a high-ownership startup environment.',
    tags: [Tag.JAVA, Tag.REACT, Tag.TYPESCRIPT]
  }
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: number): Project {
  const project = projects.find((projectCandidate: Project): boolean => projectCandidate.id === id);
  if (project === undefined) {
    throw new TypeError(`There is no project that matches the id: ${id}`);
  }
  return project;
}

export function getProjectsByFilter(filterTags: TagModel[]): Project[] {
  return projects.filter((project: Project): boolean => {
    for (const filterTag of filterTags) {
      if (!project.tags.includes(filterTag)) {
        return false;
      }
    }
    return true;
  });
}

