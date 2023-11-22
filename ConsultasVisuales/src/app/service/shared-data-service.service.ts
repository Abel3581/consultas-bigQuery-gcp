import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  // private chartDataSubject = new BehaviorSubject<(number | null)[]>([]);
  // private chartCategoriesSubject = new BehaviorSubject<string[]>([]);
  private chartDataSubject = new BehaviorSubject<{ name: string; data: (number | null)[] }[]>([]);
  private chartCategoriesSubject = new BehaviorSubject<string[]>([]);
  chartData$ = this.chartDataSubject.asObservable();
  chartCategories$ = this.chartCategoriesSubject.asObservable();

  // updateChartData(data: (number | null)[], categories: string[]) {
  //   this.chartDataSubject.next(data);
  //   this.chartCategoriesSubject.next(categories);
  // }
  updateChartData(series: { name: string; data: (number | null)[] }[], categories: string[]) {
    this.chartDataSubject.next(series);
    this.chartCategoriesSubject.next(categories);
  }

  constructor() { }
}
