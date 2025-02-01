import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tag';
import ProjectService from '../_services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {

  projects = {} as Project[];

  isCollapsed: boolean = true;

  javascript: boolean = false;
  typescript: boolean = false;
  java: boolean = false;
  go: boolean = false;
  python: boolean = false;
  nodejs: boolean = false;
  csharp: boolean = false;
  aspnet: boolean = false;

  angular: boolean = false;
  react: boolean = false;
  vue: boolean = false;
  spring: boolean = false;
  django: boolean = false;

  constructor(
    private readonly titleService: Title,
    private readonly projectService: ProjectService) {
    this.titleService.setTitle('Portfolio | JunhKi');
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  filter() {
    const filterTags: Tag[] = [];
    if (this.javascript) {
      filterTags.push(Tag.JAVASCRIPT);
    }
    if (this.typescript) {
      filterTags.push(Tag.TYPESCRIPT);
    }
    if (this.java) {
      filterTags.push(Tag.JAVA);
    }
    if (this.go) {
      filterTags.push(Tag.GO);
    }
    if (this.python) {
      filterTags.push(Tag.PYTHON);
    }
    if (this.nodejs) {
      filterTags.push(Tag.NODEJS);
    }
    if (this.csharp) {
      filterTags.push(Tag.CSHARP);
    }
    if (this.aspnet) {
      filterTags.push(Tag.ASPNET);
    }
    if (this.angular) {
      filterTags.push(Tag.ANGULAR);
    }
    if (this.react) {
      filterTags.push(Tag.REACT);
    }
    if (this.vue) {
      filterTags.push(Tag.VUE);
    }
    if (this.spring) {
      filterTags.push(Tag.SPRING);
    }
    if (this.django) {
      filterTags.push(Tag.DJANGO);
    }
    this.projects = this.projectService.getProjectsByFilter(filterTags);
  }

  resetFilters() {
    this.javascript = false;
    this.typescript = false;
    this.java = false;
    this.go = false;
    this.python = false;
    this.nodejs = false;
    this.csharp = false;
    this.aspnet = false;
    this.angular = false;
    this.react = false;
    this.vue = false;
    this.spring = false;
    this.django = false;
    this.projects = this.projectService.getProjects();
  }
}
