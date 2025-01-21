import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '../_models/Project';
import ProjectService from '../_services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {

  projects = {} as Project[];

  constructor(
    private readonly titleService: Title,
    private readonly projectService: ProjectService) {
    this.titleService.setTitle('Portfolio | JunhKi');
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}
