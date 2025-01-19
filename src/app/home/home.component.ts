import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import ProjectService from '../_services/project.service';
import { Project } from '../_models/Project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  featuredProject = {} as Project;

  constructor(private readonly titleService: Title, private readonly projectService: ProjectService) {
    this.titleService.setTitle('Junhyung Ki - Home');
  }

  ngOnInit(): void {
    this.featuredProject = this.projectService.getProjectById(0);
  }
}
