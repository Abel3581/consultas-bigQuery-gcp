import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};




@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements  OnChanges, OnDestroy{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
// Suscripciones
private chartDataSubscription!: Subscription;
private chartCategoriesSubscription!: Subscription;
  // Propiedades para datos y categorías
  @Input() chartData: { name: string; data: (number | null)[] }[] = [];
  @Input() chartCategories: string[] = [];

  constructor(private sharedDataService: SharedDataServiceService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 600,
        height: 350,
        type: "bar"
      },
      title: {
        text: "Big-Query"
      },
      xaxis: {
        categories: []
      }
    };

    // Suscríbete a los cambios en el servicio
    this.sharedDataService.chartData$.subscribe(data => {
      if (this.chartOptions.series) {
        this.chartOptions.series = data;
      }
    });

    this.sharedDataService.chartCategories$.subscribe(categories => {
      if (this.chartOptions.xaxis) {
        this.chartOptions.xaxis.categories = categories;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Cambios en el componente GraficasComponent:", changes);
    console.log("chartData:", this.chartData);
    console.log("chartCategories:", this.chartCategories);

    if (changes['chartData'] || changes['chartCategories']) {
      this.updateChartOptions();
    }
  }
  ngOnDestroy(): void {
    // Desuscribirse cuando el componente se destruye
    this.chartDataSubscription.unsubscribe();
    this.chartCategoriesSubscription.unsubscribe();
  }

  updateChartOptions() {
    if (this.chartOptions.xaxis) {
      this.chartOptions.series = this.chartData;
      this.chartOptions.xaxis.categories = this.chartCategories;
      console.log("Comp graficos", this.chartData, this.chartCategories);
    }
  }

  // @ViewChild("chart") chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  // Nuevas propiedades para datos y categorías
  // @Input() chartData: number[] = [];
  // @Input() chartCategories: string[] = [];
   // Nuevas propiedades para datos y categorías
  //  @Input() chartData: { name: string; data: (number | null)[] }[] = [];
  //  @Input() chartCategories: string[] = [];

  // constructor(private sharedDataService: SharedDataServiceService){
  //   this.chartOptions = {
  //     series: [],
  //     chart: {
  //       width: 600,
  //       height: 350,
  //       type: "bar"
  //     },
  //     title: {
  //       text: "My First Angular Chart"
  //     },
  //     xaxis: {
  //       categories: []
  //     }
  //   };
  // // Suscríbete a los cambios en el servicio
  // this.sharedDataService.chartData$.subscribe(data => {
  //   if (this.chartOptions.series) {
  //     this.chartOptions.series[0].data = data;
  //   }
  // });

  // this.sharedDataService.chartCategories$.subscribe(categories => {
  //   if(this.chartOptions.xaxis){
  //     this.chartOptions.xaxis.categories = categories;
  //   }
  // });
//   this.chartOptions = {
//     series: [],
//     chart: {
//       width: 600,
//       height: 350,
//       type: "bar"
//     },
//     title: {
//       text: "My First Angular Chart"
//     },
//     xaxis: {
//       categories: []
//     }
//   };
// }
//   ngOnChanges(changes: SimpleChanges): void {
//     console.log("Cambios en el componente GraficasComponent:", changes);
//   console.log("chartData:", this.chartData);
//   console.log("chartCategories:", this.chartCategories);
//     if (changes['chartData'] || changes['chartCategories']) {
//       this.updateChartOptions();
//     }
//   }
// ngOnChanges(changes: SimpleChanges): void {
//   if (changes['chartData'] || changes['chartCategories']) {
//     this.updateChartOptions();
//   }
// }


// updateChartOptions() {
//   if (this.chartOptions.xaxis) {
//     this.chartOptions.series = this.chartData;
//     this.chartOptions.xaxis.categories = this.chartCategories;
//     console.log("Comp graficos", this.chartData,this.chartCategories);
//   }
// }


}
