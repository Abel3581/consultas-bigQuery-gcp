import { Component } from '@angular/core';
import { UptimeService } from './service/uptime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConsultasVisuales';
  constructor(private uptimeService: UptimeService) {
    this.uptimeService.startTimer();
  }
}
