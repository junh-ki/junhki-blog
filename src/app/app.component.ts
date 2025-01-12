import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, NavComponent, RouterOutlet],
})
export class AppComponent {
  title = 'junhki-blog';
}
