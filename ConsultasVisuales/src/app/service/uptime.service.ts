import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UptimeService {

  private startTime!: number;

  startTimer() {
    this.startTime = Date.now();
  }

  getUptime(): string {
    const milliseconds = Date.now() - this.startTime;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedTime =
      this.padNumber(hours) + ':' +
      this.padNumber(minutes % 60) + ':' +
      this.padNumber(seconds % 60);

    return formattedTime;
  }

  private padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
