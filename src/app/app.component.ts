import { TopbarComponent } from './topbar/topbar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaisieComponent } from './saisie/saisie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, SaisieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mii-track';
}
