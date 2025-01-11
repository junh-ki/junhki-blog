import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, NavComponent],
})
export class AppComponent {
  title = 'junhki-blog';
}
