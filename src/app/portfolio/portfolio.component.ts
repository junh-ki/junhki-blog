import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tag';
import { NgFor } from '@angular/common';
import ProjectService from '../_services/project.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgFor, ProjectCardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {

  projects = {} as Project[];

  constructor(
    private readonly titleService: Title,
    private readonly projectService: ProjectService) {
    this.titleService.setTitle('Junhyung Ki - Portfolio');
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}
