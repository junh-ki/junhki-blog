import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tag';

@Injectable({
  providedIn: 'root'
})
export default class ProjectService {

  projects: Project[] = [
    {
      id: 0,
      name: "Sample Python Project",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Python project that analyzes stock market data.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.PYTHON]
    },
    {
      id: 1, name: "Sample Angular App",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Fullstack web app developed using Angular and Node.JS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.ANGULAR, Tag.TYPESCRIPT, Tag.NODEJS]
    },
    {
      id: 2,
      name: "Sample .Net App",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Fullstack web app developed using React and ASP.NET",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.REACT ,Tag.CSHARP, Tag.ASPNET]
    },
    {
      id: 3,
      name: "Web API Project",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Web API Project that was developed for a class project.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.CSHARP, Tag.ASPNET]
    },
    {
      id: 4,
      name: "Chrome Extension",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Developed a chrome extension that tracks the prices of furniture.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.JAVASCRIPT]
    },
    {
      id: 5,
      name: "Mobile App",
      pictures: [
        "assets/gif/lalala.gif",
        "assets/gif/adapt-or-die.gif",
        "assets/gif/do-not-explain-ourselves.gif",
      ],
      projectLink: "//www.github.com/junh-ki",
      summary: "Mobile app developed in java that tracks the departure and arrival of trains.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [Tag.JAVA]
    }
  ];

  constructor() {}

  getProjects() {
    return this.projects;
  }

  getProjectById(id: number): Project {
    let project = this.projects.find(project => project.id === id);
    if (project === undefined) {
      throw new TypeError('There is no project that matches the id: ' + id);
    }
    return project;
  }
}
