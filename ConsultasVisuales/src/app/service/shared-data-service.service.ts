import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountyNatalitySearchResponse } from '../model/county-natality-search-response';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  //Datos para compartir a graficoCircular
  private dataGraficoCircular = new BehaviorSubject<CountyNatalitySearchResponse[]>([]);
  data$ = this.dataGraficoCircular.asObservable();
  setData(data: CountyNatalitySearchResponse[]) {
    console.log("Datos del servicio sharedDataService => setData =  ",this.data$);
    this.dataGraficoCircular.next(data);
  }
  // Fin Datos para compartir a graficoCircular

  private chartDataSubject = new BehaviorSubject<{ name: string; data: (number | null)[] }[]>([]);
  private chartCategoriesSubject = new BehaviorSubject<string[]>([]);
  chartData$ = this.chartDataSubject.asObservable();
  chartCategories$ = this.chartCategoriesSubject.asObservable();

  updateChartData(series: { name: string; data: (number | null)[] }[], categories: string[]) {
    this.chartDataSubject.next(series);
    this.chartCategoriesSubject.next(categories);
  }

  constructor() { }


}
