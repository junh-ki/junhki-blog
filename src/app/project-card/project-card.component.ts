import { Component, Input } from '@angular/core';
import { Project } from '../_models/Project';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project = {} as Project;
}
